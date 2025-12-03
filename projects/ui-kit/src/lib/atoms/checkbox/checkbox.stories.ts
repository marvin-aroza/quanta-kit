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
