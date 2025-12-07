import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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
    '[attr.aria-checked]': 'isSelected()',
    '[attr.aria-disabled]': 'hostDisabled()',
    '[attr.role]': 'isMulti() ? "checkbox" : "radio"',
    '[class.disabled]': 'hostDisabled()',
    '[class.selected]': 'isSelected()',
    // Keyboard support will be managed by parent or native listing for now
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
  hostDisabled = signal(false);
  icon = input<string>();
  isMulti = signal(false);

  // State managed by parent
  isSelected = signal(false);
  label = input<string>();
  value = input.required<unknown>();

  private readonly parent = inject(QuantaSegmentedButtonToken);

  handleClick() {
    if (!this.hostDisabled()) {
      this.parent.toggle(this.value());
    }
  }
}
