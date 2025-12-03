import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
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
} from '@angular/forms';

let nextId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantaCheckboxComponent),
    },
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuantaCheckboxComponent),
    },
  ],
  selector: 'quanta-checkbox',
  styleUrl: './checkbox.component.scss',
  templateUrl: './checkbox.component.html',
})
export class QuantaCheckboxComponent implements ControlValueAccessor, Validator {
  changed = output<boolean>();
  checkboxId = `quanta-checkbox-${nextId++}`;
  checked = model<boolean>(false);
  disabled = input<boolean>(false);

  indeterminate = input<boolean>(false);
  private _formDisabled = signal<boolean>(false);

  isDisabled = computed(() => this.disabled() || this._formDisabled());
  label = input<string>();
  required = input<boolean>(false);

  onBlur() {
    this.onTouched();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  toggle(event: Event) {
    if (this.isDisabled()) return;

    event.preventDefault();
    this.checked.update((c) => !c);
    this.onChange(this.checked());
    this.changed.emit(this.checked());
    this.onTouched();
  }

  validate(_: AbstractControl): null | ValidationErrors {
    if (this.required() && !this.checked()) {
      return { required: true };
    }
    return null;
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }
}
