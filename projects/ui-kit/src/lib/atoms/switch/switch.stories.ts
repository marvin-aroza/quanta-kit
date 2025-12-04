import { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaSwitchComponent } from './switch.component';

const meta: Meta<QuantaSwitchComponent> = {
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showIcons: {
      control: 'boolean',
    },
  },
  component: QuantaSwitchComponent,
  tags: ['autodocs'],
  title: 'Atoms/Switch',
};

export default meta;
type Story = StoryObj<QuantaSwitchComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    showIcons: false,
  },
  render: (args) => ({
    props: args,
    template: `<quanta-switch [checked]="checked" [disabled]="disabled" [showIcons]="showIcons">Label</quanta-switch>`,
  }),
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: (args) => ({
    props: args,
    template: `<quanta-switch [checked]="checked">Checked</quanta-switch>`,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 1rem;">
        <quanta-switch [disabled]="true" [checked]="false">Disabled Off</quanta-switch>
        <quanta-switch [disabled]="true" [checked]="true">Disabled On</quanta-switch>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    showIcons: true,
  },
  render: (args) => ({
    props: args,
    template: `<quanta-switch [showIcons]="true" [checked]="checked">With Icons</quanta-switch>`,
  }),
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <quanta-switch [checked]="false">Off</quanta-switch>
          <quanta-switch [checked]="true">On</quanta-switch>
          <quanta-switch [disabled]="true" [checked]="true">Disabled</quanta-switch>
        </div>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const switchInput = canvas.getByRole('switch');

    await step('Initial state should be unchecked', async () => {
      await expect(switchInput).not.toBeChecked();
    });

    await step('Clicking switch should toggle state', async () => {
      await userEvent.click(switchInput);
      await expect(switchInput).toBeChecked();
    });

    await step('Clicking again should toggle back', async () => {
      await userEvent.click(switchInput);
      await expect(switchInput).not.toBeChecked();
    });
  },
  render: (args) => ({
    props: args,
    template: `<quanta-switch [checked]="checked">Interactive</quanta-switch>`,
  }),
};
