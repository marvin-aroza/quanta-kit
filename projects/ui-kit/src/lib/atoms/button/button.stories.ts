import { Meta, StoryObj } from '@storybook/angular';
import { userEvent, within, expect } from 'storybook/test';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `

The \`quanta-button\` component is a versatile button element that adheres to Material 3 design guidelines. It supports multiple variants, colors, and icon integration.

## Usage

\`\`\`html
<quanta-button variant="filled" color="primary" (clicked)="handleClick()">
  Click Me
</quanta-button>
\`\`\`

### With Icon

Use the \`icon-start\` or \`icon-end\` attributes to project icons.

\`\`\`html
<quanta-button variant="outlined">
  <mat-icon icon-start>add</mat-icon>
  Add Item
</quanta-button>
\`\`\`

## API

### Inputs

| Name | Type | Default | Description |
|---|---|---|---|
| \`variant\` | \`'filled' | 'tonal' | 'outlined' | 'text' | 'elevated'\` | \`'filled'\` | The visual style of the button. |
| \`color\` | \`'primary' | 'secondary' | 'tertiary' | 'error'\` | \`'primary'\` | The color palette to use. |
| \`type\` | \`'button' | 'submit' | 'reset'\` | \`'button'\` | The native button type. |
| \`disabled\` | \`boolean\` | \`false\` | Whether the button is disabled. |

### Outputs

| Name | Type | Description |
|---|---|---|
| \`clicked\` | \`EventEmitter<Event>\` | Emitted when the button is clicked. |

## Accessibility

- Uses the native \`<button>\` element for built-in keyboard navigation and focus management.
- Supports \`disabled\` state with correct ARIA attributes.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'tonal', 'outlined', 'text', 'elevated'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    clicked: { action: 'clicked' },
  },
  render: (args) => ({
    props: args,
    template: `<quanta-button [variant]="variant" [color]="color" [disabled]="disabled" (clicked)="clicked($event)">Button</quanta-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};

export const Tonal: Story = {
  args: {
    variant: 'tonal',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'filled',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-button [variant]="variant" [color]="color" [disabled]="disabled" (clicked)="clicked($event)">
        <span icon-start style="font-size: 18px; margin-right: 8px;">+</span>
        Button
      </quanta-button>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    variant: 'filled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Verify initial state
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Button');

    // Simulate click
    await userEvent.click(button);

    // In a real app, we might check for a side effect, but here we just verify it's clickable
    await expect(button).not.toBeDisabled();
  },
};
