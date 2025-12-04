import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  effect,
  forwardRef,
  input,
  model,
  output,
  QueryList,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { QuantaRadioButtonComponent } from './radio-button.component';
import { QUANTA_RADIO_GROUP, QuantaRadioGroup } from './radio.token';

let nextId = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
    '[class.disabled]': 'disabled()',
    '[id]': 'finalId()',
    role: 'radiogroup',
  },
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantaRadioGroupComponent),
    },
    {
      multi: true,
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuantaRadioGroupComponent),
    },
    {
      provide: QUANTA_RADIO_GROUP,
      useExisting: forwardRef(() => QuantaRadioGroupComponent),
    },
  ],
  selector: 'quanta-radio-group',

  styleUrls: ['./radio-group.component.scss'],
  template: `<ng-content />`,
})
export class QuantaRadioGroupComponent
  implements AfterContentInit, ControlValueAccessor, QuantaRadioGroup, Validator
{
  ariaLabel = input<string>('', { alias: 'aria-label' });
  ariaLabelledby = input<string>('', { alias: 'aria-labelledby' });
  // Using ContentChildren with forwardRef to resolve circular dependency
  @ContentChildren(QuantaRadioButtonComponent, { descendants: true })
  buttons!: QueryList<QuantaRadioButtonComponent>;
  // eslint-disable-next-line @angular-eslint/no-output-native
  change = output<unknown>();
  disabled = input<boolean>(false);
  id = input<string>('');
  finalId = computed(() => this.id() || this.generatedId);

  name = input<string>('');

  finalName = computed(() => this.name() || this.generatedName);

  required = input<boolean>(false);

  value = model<unknown>(null);
  private _formDisabled = signal<boolean>(false);

  // Lazy generation of ID and Name to avoid side effects (incrementing nextId) when not needed
  private _generatedId: null | string = null;
  private _generatedName: null | string = null;

  private get generatedId() {
    if (!this._generatedId) {
      this._generatedId = `quanta-radio-group-${nextId++}`;
    }
    return this._generatedId;
  }
  private get generatedName() {
    if (!this._generatedName) {
      this._generatedName = `quanta-radio-group-${nextId++}`;
    }
    return this._generatedName;
  }

  constructor() {
    // Effect to sync value changes to buttons
    effect(() => {
      const currentValue = this.value();
      if (this.buttons) {
        this.updateButtonSelection(currentValue);
      }
    });

    // Effect to sync name and disabled state
    effect(() => {
      const name = this.finalName();
      const disabled = this.disabled() || this._formDisabled();
      if (this.buttons) {
        this.updateButtonState(name, disabled);
      }
    });

    // Effect to trigger validation when required changes
    effect(() => {
      this.required();
      // Defer validation update to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => this._validatorOnChange());
    });
  }

  ngAfterContentInit() {
    // Initial sync
    this.updateButtonSelection(this.value());
    this.updateButtonState(this.name(), this.disabled() || this._formDisabled());

    // Listen for dynamic button changes
    this.buttons.changes.subscribe(() => {
      this.updateButtonSelection(this.value());
      this.updateButtonState(this.name(), this.disabled() || this._formDisabled());
    });
  }

  // ControlValueAccessor
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn;
  }

  // Called by child buttons when selected
  selectValue(newValue: unknown) {
    if (this.disabled() || this._formDisabled()) return;

    this.value.set(newValue);
    this.onChange(newValue);
    this.change.emit(newValue);
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  validate(_control: AbstractControl): null | ValidationErrors {
    if (this.required() && (this.value() === null || this.value() === undefined)) {
      return { required: true };
    }
    return null;
  }

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  // Validator
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _validatorOnChange: () => void = () => {};

  private updateButtonSelection(value: unknown) {
    this.buttons.forEach((button: QuantaRadioButtonComponent) => {
      button.setChecked(button.value() === value);
    });
  }

  private updateButtonState(name: string, disabled: boolean) {
    this.buttons.forEach((button: QuantaRadioButtonComponent) => {
      button.name.set(name);
      button.setGroupDisabled(disabled);
    });
  }
}
