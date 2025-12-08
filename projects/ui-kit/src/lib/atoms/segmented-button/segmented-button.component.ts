import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  forwardRef,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { QuantaSegmentComponent } from './segment.component';
import { QuantaSegmentedButtonToken } from './segmented-button.token';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(keydown)': 'handleKeydown($event)',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.role]': 'multi() ? "group" : "radiogroup"',
    '[class.disabled]': 'disabled()',
    class: 'quanta-segmented-button',
  },
  imports: [CommonModule],
  providers: [
    {
      provide: QuantaSegmentedButtonToken,
      useExisting: forwardRef(() => QuantaSegmentedButtonComponent),
    },
  ],
  selector: 'quanta-segmented-button',
  styleUrl: './segmented-button.component.scss',
  template: `<ng-content select="quanta-segment" />`,
})
export class QuantaSegmentedButtonComponent<T = unknown> implements QuantaSegmentedButtonToken {
  /**
   * Aria label for the group.
   */
  ariaLabel = input<string>('');

  /**
   * Whether the entire group is disabled.
   */
  disabled = input<boolean>(false);

  /**
   * Whether multiple segments can be selected.
   * Default: false
   */
  multi = input<boolean>(false);

  segments = contentChildren<QuantaSegmentComponent>(QuantaSegmentComponent);

  /**
   * The selected value(s).
   * Single select: T | null
   * Multi select: T[]
   */
  selected = model<null | T | T[]>(null);

  constructor() {
    effect(() => {
      // TabIndex / Focus Initialization implementation
      // We need to react to changes in selection/multi/segments to ensure ONE item is tabbable.

      const isMulti = this.multi();
      const segments = this.segments();

      // Note: Child components now derive their own 'selected' and 'disabled' state via computed signals.
      // We only need to manage the roving tabindex here.

      // We can check the computed 'isSelected' of children?
      // Yes, signals are available on the child instances.

      if (!isMulti) {
        // Single Select: The selected item gets tabIndex 0.
        // Fallback: If none selected, the first item gets 0.

        // Note: computed signals in children might not be updated *immediately* in this effect due to signal graph?
        // Actually, if we access them, they evaluate. (Pull-based).

        let foundSelected = false;
        segments.forEach((s) => {
          if (s.isSelected()) {
            s.tabIndex.set(0);
            foundSelected = true;
          } else {
            s.tabIndex.set(-1);
          }
        });

        if (!foundSelected && segments.length > 0) {
          segments[0].tabIndex.set(0);
        }
      } else {
        // Multi-Select:
        // Standard practice: If user tabs out and back in, where do they land?
        // Simple implementation: Index 0 is entrance, OR last focused (if we tracked it).
        // Let's stick to Index 0 for simplicity.
        segments.forEach((s, i) => {
          s.tabIndex.set(i === 0 ? 0 : -1);
        });
      }
    });
  }

  handleKeydown(event: KeyboardEvent) {
    const segments = this.segments();
    if (!segments.length || this.disabled()) return;

    // We rely on bubbling. Identify which segment triggered it?
    // Actually, roving focus requires us to know WHERE we are.
    // If we are on the container, we might not know.
    // But accessibility requires focus ON the segments.
    // So the event target should be a segment.

    // Let's assume event.target is the element of the segment.
    // We can iterate segments to find the match.
    // Since we don't have direct DOM mapping easily, we can use a simpler heuristic or assumption
    // OR we inject the Index into the child and have it emit events.

    // BUT we are in the Parent. We can try to match elements.
    // This is expensive on every keypress but robust.
    const target = event.target as HTMLElement;
    const currentIndex = segments.findIndex((s) => s.elementRef.nativeElement === target);

    if (currentIndex === -1) return; // Event from outside or unknown

    let nextIndex = currentIndex;
    const isMulti = this.multi();

    switch (event.key) {
      case ' ':
      case 'Enter':
        if (!isMulti) {
          event.preventDefault();
          this.toggle(segments[currentIndex].value());
        }
        return;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= segments.length) nextIndex = 0; // Wrap
        break;
      case 'ArrowLeft':
      case 'ArrowUp': // Some support Up/Left as prev
        event.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = segments.length - 1; // Wrap
        break;
      case 'End':
        event.preventDefault();
        nextIndex = segments.length - 1;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      // Actually single select 'click' handled by child already?
      // Let's ensure we don't double trigger.
      // Child handles click/enter/space? Yes.
      // So we might not need to do anything here for Enter/Space if child stops propagation?
      // If Child handles it, we don't need it here.
      // But requested is "wire key handlers so Enter/Space activate the focused segment"
      // If I put it on Parent, I control it central.
      // Let's leave toggle to the Child's existing host bindings if they work,
      // OR better yet, let's do the focus moving here.
    }

    if (nextIndex !== currentIndex) {
      const nextSegment = segments[nextIndex];

      // Move Focus
      nextSegment.focus();

      // Update TabIndices (For Roving)
      segments.forEach((s, i) => s.tabIndex.set(i === nextIndex ? 0 : -1));

      // If Single Select, Update Selection (Follows Focus)
      if (!isMulti && !nextSegment.disabled() && !nextSegment.hostDisabled()) {
        this.toggle(nextSegment.value());
      }
    }
  }

  toggle(value: unknown) {
    if (this.disabled()) return;

    const isMulti = this.multi();
    const current = this.selected();

    if (isMulti) {
      const currentArray = (Array.isArray(current) ? current : []) as T[];
      if (currentArray.includes(value as T)) {
        this.selected.set(currentArray.filter((v) => v !== value));
      } else {
        this.selected.set([...currentArray, value as T]);
      }
    } else {
      // Single select behavior
      this.selected.set(value as T);
    }
  }
}
