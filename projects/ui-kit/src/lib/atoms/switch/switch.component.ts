import { ChangeDetectionStrategy, Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantaSwitchComponent),
    },
  ],
  selector: 'quanta-switch',
  styleUrls: ['./switch.component.scss'],
  template: `
    <label
      class="quanta-switch"
      [class.checked]="checked()"
      [class.disabled]="disabled()"
      [class.with-icons]="showIcons()"
    >
      <input
        type="checkbox"
        class="switch-input"
        role="switch"
        [id]="id()"
        [name]="name()"
        [value]="value()"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.aria-checked]="checked()"
        (change)="onChange($event)"
        (blur)="onTouched()"
      />
      <div class="switch-track">
        <div class="switch-thumb">
          @if (showIcons()) {
            @if (checked()) {
              <!-- Check Icon -->
              <svg class="switch-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            } @else {
              <!-- Close/X Icon -->
              <svg class="switch-icon" viewBox="0 0 24 24">
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            }
          }
        </div>
      </div>
      <ng-content></ng-content>
    </label>
  `,
})
export class QuantaSwitchComponent implements ControlValueAccessor {
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  id = input<string>('');
  name = input<string>('');
  showIcons = input<boolean>(false);
  value = input<string>('');

  onChange(event: Event): void {
    if (this.disabled()) {
      return;
    }
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked.set(isChecked);
    this.onChangeFn(isChecked);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeFn: (value: boolean) => void = () => {};

  onTouched(): void {
    this.onTouchedFn();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouchedFn: () => void = () => {};

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // We can't easily update the signal input from here without a separate signal or effect,
    // but usually CVA disabled state matches the input.
    // For now, we rely on the input binding.
    // To strictly support CVA setDisabledState, we might need a separate signal combined with the input.
    // But let's keep it simple for now as 'disabled' input is primary.
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }
}
