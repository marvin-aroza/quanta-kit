import { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaCheckboxComponent } from './checkbox.component';

const meta: Meta<QuantaCheckboxComponent> = {
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    required: { control: 'boolean' },
  },
  component: QuantaCheckboxComponent,
  tags: ['autodocs'],
  title: 'Atoms/Checkbox',
};

export default meta;
type Story = StoryObj<QuantaCheckboxComponent>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Checkbox Label',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Checkbox',
  },
};

export const Indeterminate: Story = {
  args: {
    checked: false,
    indeterminate: true,
    label: 'Indeterminate Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled Checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled Checked',
  },
};

export const Required: Story = {
  args: {
    checked: false,
    label: 'Agree to Terms',
    required: true,
  },
};

export const Interactive: Story = {
  args: {
    checked: false,
    label: 'Click me!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <quanta-checkbox label="Unchecked"></quanta-checkbox>
          <quanta-checkbox label="Checked" [checked]="true"></quanta-checkbox>
          <quanta-checkbox label="Indeterminate" [indeterminate]="true"></quanta-checkbox>
          <quanta-checkbox label="Disabled" [disabled]="true"></quanta-checkbox>
          <quanta-checkbox label="Disabled Checked" [disabled]="true" [checked]="true"></quanta-checkbox>
        </div>
      </div>
    `,
  }),
};
