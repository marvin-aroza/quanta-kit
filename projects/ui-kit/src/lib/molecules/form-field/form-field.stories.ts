import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaInputComponent } from '../../atoms/input/input.component';
import { QuantaFormFieldComponent } from './form-field.component';

const meta: Meta<QuantaFormFieldComponent> = {
  component: QuantaFormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [QuantaInputComponent, ReactiveFormsModule],
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
