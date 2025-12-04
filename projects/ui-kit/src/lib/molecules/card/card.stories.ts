import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaCardComponent } from './card.component';

const meta: Meta<QuantaCardComponent> = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'filled', 'outlined'],
    },
  },
  component: QuantaCardComponent,
  decorators: [
    moduleMetadata({
      imports: [QuantaButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  title: 'Molecules/Card',
};

export default meta;
type Story = StoryObj<QuantaCardComponent>;

export const Elevated: Story = {
  args: {
    variant: 'elevated',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-card [variant]="variant" style="width: 300px;">
        <h2 header style="margin: 0; font: var(--md-sys-typescale-title-medium);">Card Title</h2>
        <p>This is a standard elevated card. It sits on the surface and casts a shadow.</p>
        <div actions>
          <quanta-button variant="text">Cancel</quanta-button>
          <quanta-button variant="filled">Action</quanta-button>
        </div>
      </quanta-card>
    `,
  }),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-card [variant]="variant" style="width: 300px;">
        <h2 header style="margin: 0; font: var(--md-sys-typescale-title-medium);">Outlined Card</h2>
        <p>This card has a border and no elevation. Useful for secondary content.</p>
        <div actions>
          <quanta-button variant="text">Learn More</quanta-button>
        </div>
      </quanta-card>
    `,
  }),
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-card [variant]="variant" style="width: 300px;">
        <h2 header style="margin: 0; font: var(--md-sys-typescale-title-medium);">Filled Card</h2>
        <p>This card uses a surface variant color. Good for distinct sections.</p>
      </quanta-card>
    `,
  }),
};

export const WithMedia: Story = {
  args: {
    variant: 'elevated',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-card [variant]="variant" style="width: 300px;">
        <img media src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23e1e4d5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%2344483d'%3EImage%3C/text%3E%3C/svg%3E" alt="Placeholder Image" style="width: 100%; height: auto; display: block;">
        <h2 header style="margin: 0; font: var(--md-sys-typescale-title-medium);">Media Card</h2>
        <p>Cards can include media content like images or videos.</p>
        <div actions>
          <quanta-button variant="text">Share</quanta-button>
          <quanta-button variant="filled">Explore</quanta-button>
        </div>
      </quanta-card>
    `,
  }),
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <quanta-card variant="elevated" style="width: 300px;">
            <h2 header style="margin: 0; font: var(--md-sys-typescale-title-medium);">Elevated</h2>
            <p>Elevated card in dark mode.</p>
            <div actions>
              <quanta-button variant="text">Action</quanta-button>
            </div>
          </quanta-card>

          <quanta-card variant="outlined" style="width: 300px;">
            <h2 header style="margin: 0; font: var(--md-sys-typescale-title-medium);">Outlined</h2>
            <p>Outlined card in dark mode.</p>
            <div actions>
              <quanta-button variant="text">Action</quanta-button>
            </div>
          </quanta-card>

          <quanta-card variant="filled" style="width: 300px;">
            <h2 header style="margin: 0; font: var(--md-sys-typescale-title-medium);">Filled</h2>
            <p>Filled card in dark mode.</p>
            <div actions>
              <quanta-button variant="text">Action</quanta-button>
            </div>
          </quanta-card>
        </div>
      </div>
    `,
  }),
};
