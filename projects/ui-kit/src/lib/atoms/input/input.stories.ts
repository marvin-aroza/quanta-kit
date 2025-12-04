import { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaInputComponent } from './input.component';

const meta: Meta<QuantaInputComponent> = {
  args: {
    disabled: false,
    label: 'Label',
    placeholder: 'Placeholder text',
    type: 'text',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    icon: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    value: { control: 'text' },
  },
  component: QuantaInputComponent,
  tags: ['autodocs'],
  title: 'Atoms/Input',
};

export default meta;
type Story = StoryObj<QuantaInputComponent>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: 'Initial value',
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'search',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Supporting text',
  },
};

export const ErrorState: Story = {
  args: {
    error: 'Error message',
    value: 'Invalid input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

export const Password: Story = {
  args: {
    icon: 'lock',
    label: 'Password',
    type: 'password',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Input',
    required: true,
  },
};

export const Interactive: Story = {
  args: {
    label: 'Interactive Input',
    placeholder: 'Type something...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    // Verify initial state
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveValue('');

    // Simulate typing
    await userEvent.type(input, 'Hello World');

    // Verify value changed
    await expect(input).toHaveValue('Hello World');
  },
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
          <quanta-input label="Default Input" placeholder="Type here..."></quanta-input>
          <quanta-input label="With Icon" icon="search" placeholder="Search..."></quanta-input>
          <quanta-input label="With Value" value="Pre-filled value"></quanta-input>
          <quanta-input label="Error State" error="Invalid input" value="Wrong value"></quanta-input>
          <quanta-input label="Disabled" [disabled]="true" value="Disabled input"></quanta-input>
        </div>
      </div>
    `,
  }),
};
