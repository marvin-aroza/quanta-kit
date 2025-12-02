import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantaInputComponent),
    },
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuantaInputComponent),
    },
  ],
  selector: 'quanta-input',
  styleUrl: './input.component.scss',
  templateUrl: './input.component.html',
})
export class QuantaInputComponent implements ControlValueAccessor, Validator {
  disabled = input<boolean>(false);
  error = input<null | string>(null);
  helperText = input<null | string>(null);
  icon = input<null | string>(null);
  inputId = `quanta-input-${Math.random().toString(36).substr(2, 9)}`;
  private _formDisabled = signal<boolean>(false);
  isDisabled = computed(() => this.disabled() || this._formDisabled());
  // Derived state
  isInvalid = computed(() => !!this.error());

  label = input.required<string>();
  placeholder = input<string>('');
  required = input<boolean>(false);
  type = input<string>('text');

  // Use model for two-way binding and easy value setting
  value = model<string>('');

  onBlur() {
    this.onTouched();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};

  onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value.set(newValue);
    this.onChange(newValue);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  validate(control: AbstractControl): null | ValidationErrors {
    if (this.required()) {
      return Validators.required(control);
    }
    return null;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value.set(value || '');
  }
}
