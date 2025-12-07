import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaSegmentedButtonToken } from './segmented-button.token';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleClick()',
    '(keydown.space)': 'handleClick()',
    '[attr.aria-checked]': 'isSelected()',
    '[attr.aria-disabled]': 'hostDisabled()',
    '[attr.role]': 'isMulti() ? "checkbox" : "radio"',
    '[attr.tabindex]': 'hostDisabled() ? -1 : tabIndex()',
    '[class.disabled]': 'hostDisabled()',
    '[class.selected]': 'isSelected()',
    class: 'quanta-segment',
  },
  imports: [CommonModule, QuantaIconComponent],
  selector: 'quanta-segment',
  template: `
    <div class="quanta-segment-layer"></div>
    @if (isSelected()) {
      <quanta-icon name="check" class="quanta-segment-check" size="18"></quanta-icon>
    }
    @if (icon() && !isSelected()) {
      <quanta-icon [name]="icon()!" class="quanta-segment-icon" size="18"></quanta-icon>
    }
    @if (label()) {
      <span class="quanta-segment-label">{{ label() }}</span>
    }
  `,
})
export class QuantaSegmentComponent {
  // Inputs
  disabled = input<boolean>(false);
  // Injections
  elementRef = inject(ElementRef);
  private readonly parent = inject(QuantaSegmentedButtonToken);
  // Computed State derived from Parent
  hostDisabled = computed(() => this.parent.disabled() || this.disabled());

  icon = input<string>();
  isMulti = this.parent.multi;

  value = input.required<unknown>();
  isSelected = computed(() => {
    const currentSelected = this.parent.selected();
    const isMulti = this.parent.multi();
    const value = this.value();

    if (isMulti) {
      const selArray = Array.isArray(currentSelected) ? currentSelected : [];
      return selArray.includes(value);
    } else {
      return currentSelected === value;
    }
  });

  label = input<string>();

  // Managed by parent for roving tabindex (this remains writable as parent sets it via interaction)
  tabIndex = signal(-1);

  constructor() {
    effect(() => {
      // Logic placeholder for side-effects if needed
    });
  }

  focus() {
    this.elementRef.nativeElement.focus();
  }

  handleClick() {
    if (!this.hostDisabled()) {
      this.parent.toggle(this.value());
    }
  }
}
