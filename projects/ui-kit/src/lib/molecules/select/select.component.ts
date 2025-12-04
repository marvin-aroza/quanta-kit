import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: number | string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantaSelectComponent),
    },
  ],
  selector: 'quanta-select',
  styleUrls: ['./select.component.scss'],
  template: `
    <div
      class="quanta-select-container"
      [class.disabled]="isDisabled()"
      [class.has-error]="!!errorMessage()"
    >
      @if (label()) {
        <label [for]="id()" class="select-label">{{ label() }}</label>
      }
      <div class="select-wrapper">
        <select
          [id]="id()"
          [disabled]="isDisabled()"
          [value]="value()"
          [attr.aria-invalid]="!!errorMessage() || null"
          [attr.aria-describedby]="errorMessage() || helperText() ? id() + '-description' : null"
          (change)="onSelectChange($event)"
          (blur)="onTouched()"
          class="native-select"
        >
          @if (placeholder()) {
            <option value="" disabled selected>{{ placeholder() }}</option>
          }
          @for (option of options(); track option.value) {
            <option [value]="option.value">{{ option.label }}</option>
          }
        </select>
        <div class="select-arrow">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
      @if (errorMessage()) {
        <span [id]="id() + '-description'" class="error-message">{{ errorMessage() }}</span>
      } @else if (helperText()) {
        <span [id]="id() + '-description'" class="helper-text">{{ helperText() }}</span>
      }
    </div>
  `,
})
export class QuantaSelectComponent implements ControlValueAccessor {
  disabled = input<boolean>(false);
  errorMessage = input<string>('');
  helperText = input<string>('');
  id = input<string>(`quanta-select-${Math.random().toString(36).substring(2, 9)}`);
  label = input<string>('');
  options = input<SelectOption[]>([]);
  placeholder = input<string>('');

  private _disabledState = signal<boolean>(false);
  protected isDisabled = computed(() => this.disabled() || this._disabledState());

  private _value = signal<number | string>('');
  protected value = computed(() => this._value());

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeFn: (value: number | string) => void = () => {};
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newValue = selectElement.value;
    this._value.set(newValue);
    this.onChangeFn(newValue);
  }

  onTouched(): void {
    this.onTouchedFn();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouchedFn: () => void = () => {};

  registerOnChange(fn: (value: number | string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledState.set(isDisabled);
  }

  writeValue(value: number | string): void {
    this._value.set(value);
  }
}
