import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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
  disabled = input<boolean>(false);
  elementRef = inject(ElementRef); // Injected ElementRef

  hostDisabled = signal(false);
  icon = input<string>();
  isMulti = signal(false);

  // State managed by parent
  isSelected = signal(false);
  label = input<string>();

  // Managed by parent for roving tabindex
  tabIndex = signal(-1); // Added tabIndex signal
  value = input.required<unknown>();

  private readonly parent = inject(QuantaSegmentedButtonToken);

  constructor() {
    // Added constructor
    effect(() => {
      // If we are disabled, force tabIndex to -1
      if (this.hostDisabled()) {
        // managed by binding but good to be explicit/reactive if logic grows
      }
    });
  }

  focus() {
    // Added focus method
    this.elementRef.nativeElement.focus();
  }

  handleClick() {
    if (!this.hostDisabled()) {
      this.parent.toggle(this.value());
    }
  }
}
