import { Meta, StoryObj } from '@storybook/angular';
import { userEvent, within } from 'storybook/test';
import { QuantaIconButtonComponent } from './icon-button.component';

const meta: Meta<QuantaIconButtonComponent> = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['standard', 'filled', 'tonal', 'outlined'],
    },
  },
  component: QuantaIconButtonComponent,
  tags: ['autodocs'],
  title: 'Atoms/IconButton',
};

export default meta;
type Story = StoryObj<QuantaIconButtonComponent>;

export const Gallery: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaIconButtonComponent],
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <quanta-icon-button icon="settings" variant="standard" title="Standard"></quanta-icon-button>
        <quanta-icon-button icon="edit" variant="filled" title="Filled"></quanta-icon-button>
        <quanta-icon-button icon="delete" variant="tonal" title="Tonal"></quanta-icon-button>
        <quanta-icon-button icon="info" variant="outlined" title="Outlined"></quanta-icon-button>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem;">
         <quanta-icon-button icon="settings" variant="standard" disabled="true"></quanta-icon-button>
         <quanta-icon-button icon="edit" variant="filled" disabled="true"></quanta-icon-button>
      </div>
    `,
  }),
};

export const Toggle: Story = {
  args: {
    icon: 'favorite',
    toggle: true,
    variant: 'standard',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button); // Should toggle on
    // Verification would be aria-pressed=true
  },
};

export const DarkTheme: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaIconButtonComponent],
    },
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0; color: var(--md-sys-color-on-surface);">Dark Theme</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
            <quanta-icon-button icon="settings" variant="standard" title="Standard"></quanta-icon-button>
            <quanta-icon-button icon="edit" variant="filled" title="Filled"></quanta-icon-button>
            <quanta-icon-button icon="delete" variant="tonal" title="Tonal"></quanta-icon-button>
            <quanta-icon-button icon="info" variant="outlined" title="Outlined"></quanta-icon-button>
        </div>
      </div>
    `,
  }),
};
