import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
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
  providers: [{ provide: QuantaSegmentedButtonToken, useExisting: QuantaSegmentedButtonComponent }],
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
      const currentSelected = this.selected();
      const isMulti = this.multi();
      const segments = this.segments();

      // State Pass-down
      segments.forEach((segment: QuantaSegmentComponent) => {
        segment.isMulti.set(isMulti);
        segment.hostDisabled.set(this.disabled() || segment.disabled());

        let isSelected = false;
        if (isMulti) {
          const selArray = Array.isArray(currentSelected) ? currentSelected : [];
          isSelected = selArray.includes(segment.value() as T);
        } else {
          isSelected = currentSelected === (segment.value() as T);
        }
        segment.isSelected.set(isSelected);
      });

      // TabIndex / Focus Initialization (Simplified)
      // If Single Select: Selected item is 0, others -1.
      // If None selected: Index 0 is 0.
      if (!isMulti) {
        const selectedIndex = segments.findIndex((s) => s.isSelected());
        const focusIndex = selectedIndex !== -1 ? selectedIndex : 0;

        segments.forEach((s, i) => {
          s.tabIndex.set(i === focusIndex ? 0 : -1);
        });
      } else {
        // Multi-Select Logic:
        // Just defaulting 0 to 0 for entrance.
        // Roving logic depends on interaction.
        // For now, let's keep it simple: First item is 0, unless we want to persist last focused.
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
        event.preventDefault();
        this.toggle(segments[currentIndex].value());
        return; // Selection handled, no move needed (unless single select moves focus?)
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
