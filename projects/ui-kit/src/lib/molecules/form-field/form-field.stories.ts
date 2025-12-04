import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaCheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { QuantaInputComponent } from '../../atoms/input/input.component';
import { QuantaRadioButtonComponent } from '../../atoms/radio/radio-button.component';
import { QuantaRadioGroupComponent } from '../../atoms/radio/radio-group.component';
import { QuantaFormFieldComponent } from './form-field.component';

const meta: Meta<QuantaFormFieldComponent> = {
  component: QuantaFormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [
        QuantaInputComponent,
        QuantaCheckboxComponent,
        QuantaRadioGroupComponent,
        QuantaRadioButtonComponent,
        QuantaButtonComponent,
        ReactiveFormsModule,
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <quanta-form-field [errorMessage]="errorMessage">
        <quanta-input [label]="label" placeholder="Enter text"></quanta-input>
      </quanta-form-field>
    `,
  }),
  tags: ['autodocs'],
  title: 'Molecules/Form Field',
};

export default meta;
type Story = StoryObj<QuantaFormFieldComponent>;

export const Default: Story = {
  args: {
    label: 'Username',
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'Invalid email address',
    label: 'Email',
  },
};

export const WithReactiveForm: Story = {
  render: (args) => ({
    props: {
      demoControl: new FormControl('', [Validators.required]),
      ...args,
    },
    template: `
      <quanta-form-field>
        <quanta-input [label]="label || 'Required Field'" [formControl]="demoControl" placeholder="Type something..."></quanta-input>
      </quanta-form-field>
      <button (click)="demoControl.markAsTouched()">Touch Control</button>
    `,
  }),
};

export const WithCheckbox: Story = {
  render: (args) => ({
    props: args,
    template: `
      <quanta-form-field>
        <quanta-checkbox label="Accept Terms & Conditions"></quanta-checkbox>
      </quanta-form-field>
    `,
  }),
};

export const WithRadioGroup: Story = {
  render: (args) => ({
    props: args,
    template: `
      <quanta-form-field>
        <label style="display: block; margin-bottom: 8px; font-weight: 500; font-family: var(--md-sys-typescale-body-medium-font);">Select Option</label>
        <quanta-radio-group name="options">
          <quanta-radio-button value="1" label="Option 1"></quanta-radio-button>
          <quanta-radio-button value="2" label="Option 2"></quanta-radio-button>
        </quanta-radio-group>
      </quanta-form-field>
    `,
  }),
};

export const RegistrationForm: Story = {
  render: (_args) => ({
    props: {
      form: new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        gender: new FormControl('male', Validators.required),
        terms: new FormControl(false, Validators.requiredTrue),
        username: new FormControl('', Validators.required),
      }),
      onSubmit: () => alert('Form Submitted!'),
    },
    template: `
      <form [formGroup]="form" (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; padding: 1rem; border: 1px solid var(--md-sys-color-outline-variant); border-radius: 8px;">
        <h3 style="margin-top: 0;">Registration</h3>
        
        <quanta-form-field [errorMessage]="form.get('username')?.touched && form.get('username')?.invalid ? 'Username is required' : ''">
          <quanta-input formControlName="username" label="Username" placeholder="johndoe"></quanta-input>
        </quanta-form-field>

        <quanta-form-field [errorMessage]="form.get('email')?.touched && form.get('email')?.invalid ? 'Valid email is required' : ''">
          <quanta-input formControlName="email" label="Email" type="email" placeholder="john@example.com"></quanta-input>
        </quanta-form-field>

        <quanta-form-field>
          <label style="display: block; margin-bottom: 8px; font-weight: 500; font-family: var(--md-sys-typescale-body-medium-font);">Gender</label>
          <quanta-radio-group formControlName="gender">
            <quanta-radio-button value="male" label="Male"></quanta-radio-button>
            <quanta-radio-button value="female" label="Female"></quanta-radio-button>
            <quanta-radio-button value="other" label="Other"></quanta-radio-button>
          </quanta-radio-group>
        </quanta-form-field>

        <quanta-form-field [errorMessage]="form.get('terms')?.touched && form.get('terms')?.invalid ? 'You must accept terms' : ''">
          <quanta-checkbox formControlName="terms" label="I accept the terms and conditions"></quanta-checkbox>
        </quanta-form-field>

        <quanta-button type="submit" variant="filled" [disabled]="form.invalid">Register</quanta-button>
      </form>
    `,
  }),
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme Form</h3>
        <quanta-form-field>
          <quanta-input label="Dark Input" placeholder="Type here..."></quanta-input>
        </quanta-form-field>
        <quanta-form-field>
          <quanta-checkbox label="Dark Checkbox"></quanta-checkbox>
        </quanta-form-field>
      </div>
    `,
  }),
};
