import { Meta, StoryObj } from '@storybook/angular';
import { QuantaDividerComponent } from './divider.component';

const meta: Meta<QuantaDividerComponent> = {
  args: {
    inset: 'none',
    vertical: false,
  },
  argTypes: {
    inset: {
      control: 'select',
      description: 'Inset type',
      options: ['none', 'start', 'end'],
    },
    vertical: {
      control: 'boolean',
      description: 'Whether the divider is vertical',
    },
  },
  component: QuantaDividerComponent,
  tags: ['autodocs'],
  title: 'Atoms/Divider',
};

export default meta;
type Story = StoryObj<QuantaDividerComponent>;

export const Horizontal: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px; padding: 16px; border: 1px solid #ccc;">
        <p>Item 1</p>
        <quanta-divider [vertical]="vertical" [inset]="inset"></quanta-divider>
        <p>Item 2</p>
        <quanta-divider [vertical]="vertical" [inset]="inset"></quanta-divider>
        <p>Item 3</p>
      </div>
    `,
  }),
};

export const InsetStart: Story = {
  args: {
    inset: 'start',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px; padding: 16px; border: 1px solid #ccc;">
        <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 40px; height: 40px; background: #eee; border-radius: 50%;"></div>
            <div>
                <div>Header 1</div>
                <div>Subhead</div>
            </div>
        </div>
        <quanta-divider [vertical]="vertical" [inset]="inset"></quanta-divider>
        <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 40px; height: 40px; background: #eee; border-radius: 50%;"></div>
             <div>
                <div>Header 2</div>
                <div>Subhead</div>
            </div>
        </div>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 50px; display: flex; align-items: center; border: 1px solid #ccc; padding: 8px;">
        <span>Item 1</span>
        <quanta-divider [vertical]="vertical" [inset]="inset"></quanta-divider>
        <span>Item 2</span>
        <quanta-divider [vertical]="vertical" [inset]="inset"></quanta-divider>
        <span>Item 3</span>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  parameters: {
    themes: {
      default: 'dark',
    },
  },
  render: (args) => ({
    props: args,
    template: `
        <div data-theme="dark" style="background: #143109; padding: 20px; color: #e1e4d5;">
            <p>Dark Theme Content</p>
            <quanta-divider></quanta-divider>
            <p>More Content</p>
        </div>
      `,
  }),
};
