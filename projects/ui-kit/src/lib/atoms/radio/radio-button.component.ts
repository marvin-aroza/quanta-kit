import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { QUANTA_RADIO_GROUP } from './radio.token';

let nextId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.checked]': 'checked()',
    '[class.disabled]': 'isDisabled()',
    class: 'quanta-radio-button',
  },
  imports: [CommonModule],
  selector: 'quanta-radio-button',

  styleUrl: './radio-button.component.scss',
  templateUrl: './radio-button.component.html',
})
export class QuantaRadioButtonComponent {
  ariaLabel = input<string>('', { alias: 'aria-label' });

  checked = signal<boolean>(false);
  disabled = input<boolean>(false);
  id = input<string>(`quanta-radio-button-${nextId++}`);
  private groupDisabled = signal<boolean>(false);
  isDisabled = computed(() => this.disabled() || this.groupDisabled());

  label = input<string>();
  // State managed by group
  name = signal<string>('');
  value = input.required<unknown>();

  private group = inject(QUANTA_RADIO_GROUP, { optional: true });

  constructor() {
    if (!this.group) {
      console.warn('QuantaRadioButtonComponent must be used within a QuantaRadioGroupComponent');
    }
  }

  // Interaction
  onInputPayload(event: Event) {
    event.stopPropagation();
    if (!this.isDisabled() && this.group) {
      this.group.selectValue(this.value());
    }
  }

  // Called by Group
  setChecked(checked: boolean) {
    this.checked.set(checked);
  }

  setGroupDisabled(disabled: boolean) {
    this.groupDisabled.set(disabled);
  }
}
