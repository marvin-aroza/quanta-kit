import { Meta, StoryObj } from '@storybook/angular';

import { StyleGuideComponent } from './style-guide.component';

const meta: Meta<StyleGuideComponent> = {
  component: StyleGuideComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Pages/Style Guide',
};

export default meta;
type Story = StoryObj<StyleGuideComponent>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    themes: {
      default: 'dark',
    },
  },
  render: () => ({
    template: `
      <div data-theme="dark" style="padding: 20px; background: var(--background-color); min-height: 100vh;">
        <quanta-style-guide></quanta-style-guide>
      </div>
    `,
  }),
};
