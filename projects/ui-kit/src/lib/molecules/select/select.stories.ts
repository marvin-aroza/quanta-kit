import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaSelectComponent } from './select.component';

import { QuantaButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<QuantaSelectComponent> = {
  argTypes: {
    disabled: { control: 'boolean' },
    options: { control: 'object' },
  },
  component: QuantaSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, QuantaButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  title: 'Molecules/Select',
};

export default meta;
type Story = StoryObj<QuantaSelectComponent>;

const defaultOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  args: {
    label: 'Select Option',
    options: defaultOptions,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Favorite Fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ],
    placeholder: 'Choose a fruit...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: defaultOptions,
  },
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl({ disabled: true, value: '1' }),
    },
    template: `
      <quanta-select
        [label]="label"
        [options]="options"
        [formControl]="formControl"
      ></quanta-select>
    `,
  }),
};

export const WithError: Story = {
  args: {
    errorMessage: 'This field is required',
    label: 'Required Field',
    options: defaultOptions,
  },
};

export const ReactiveForm: Story = {
  render: (_args) => ({
    props: {
      form: new FormGroup({
        fruit: new FormControl('', Validators.required),
      }),
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ],
    },
    template: `
      <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
        <quanta-select
          formControlName="fruit"
          label="Favorite Fruit"
          placeholder="Select one..."
          [options]="options"
          [errorMessage]="form.get('fruit')?.touched && form.get('fruit')?.invalid ? 'Please select a fruit' : ''"
        ></quanta-select>
        
        <div>
          Selected: {{ form.value.fruit }}
        </div>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <quanta-button variant="outlined" (clicked)="form.get('fruit')?.markAsTouched()">Touch Control</quanta-button>
          <quanta-button variant="outlined" (clicked)="form.get('fruit')?.disable()">Disable</quanta-button>
          <quanta-button variant="outlined" (clicked)="form.get('fruit')?.enable()">Enable</quanta-button>
        </div>
      </form>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    label: 'Interactive Select',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue', value: 'blue' },
    ],
    placeholder: 'Select a color...',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox'); // Native select often has combobox role or just implicit

    await step('Initial state', async () => {
      await expect(select).toHaveValue('');
    });

    await step('Select option', async () => {
      await userEvent.selectOptions(select, 'green');
      await expect(select).toHaveValue('green');
    });
  },
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl('dark'),
    },
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme Select</h3>
        <quanta-select
          label="Choose Theme"
          [options]="[
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'System', value: 'system' }
          ]"
          [formControl]="control"
        ></quanta-select>
      </div>
    `,
  }),
};
