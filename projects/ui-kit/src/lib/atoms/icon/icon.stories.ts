import { Meta, StoryObj } from '@storybook/angular';
import { QuantaIconComponent } from './icon.component';

const meta: Meta<QuantaIconComponent> = {
  component: QuantaIconComponent,
  tags: ['autodocs'],
  title: 'Atoms/Icon',
};

export default meta;
type Story = StoryObj<QuantaIconComponent>;

export const Material: Story = {
  args: {
    name: 'favorite',
  },
};

export const CustomSVG: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaIconComponent],
    },
    template: `
      <quanta-icon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <circle cx="12" cy="12" r="10"></circle>
           <line x1="12" y1="8" x2="12" y2="16"></line>
           <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </quanta-icon>
    `,
  }),
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    // Verify it renders
    const icon = canvasElement.querySelector('quanta-icon');
    if (!icon) throw new Error('Icon not found');

    // Cannot easily test effective visual rendering without visual regression tools,
    // but we can check if the DOM structure is correct.
    // Material icons usually just contain text.
    // const span = icon.querySelector('span'); // Assuming implementation details
    // if (!span) throw new Error('Inner span not found');
    // if (span.textContent?.trim() !== 'home') throw new Error('Icon text mismatch');
  },
  render: () => ({
    moduleMetadata: {
      imports: [QuantaIconComponent],
    },
    template: `<quanta-icon name="home"></quanta-icon>`,
  }),
};

export const DarkTheme: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaIconComponent],
    },
    template: `
       <div data-theme="dark" style="background: #121212; padding: 24px; color: #ffffff;">
          <div style="display: flex; gap: 16px;">
             <quanta-icon name="light_mode"></quanta-icon>
             <quanta-icon name="dark_mode"></quanta-icon>
             <quanta-icon name="settings"></quanta-icon>
          </div>
       </div>
    `,
  }),
};
