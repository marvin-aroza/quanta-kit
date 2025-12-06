import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaButtonComponent } from '../button/button.component';
import { QuantaTooltipDirective } from './tooltip.directive';

const meta: Meta<QuantaTooltipDirective> = {
  component: QuantaTooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [QuantaButtonComponent, QuantaTooltipDirective],
    }),
  ],
  tags: ['autodocs'],
  title: 'Atoms/Tooltip',
};

export default meta;
type Story = StoryObj<QuantaTooltipDirective>;

export const Basic: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; padding: 2rem; justify-content: center;">
        <quanta-button quantaTooltip="Tooltip Text">Hover Me</quanta-button>
        <button quantaTooltip="Native Button Tooltip" style="padding: 10px;">Native Button</button>
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; align-items: center;">
        <quanta-button quantaTooltip="Tooltip Above" position="above">Above</quanta-button>
        
        <div style="display: flex; gap: 2rem;">
            <quanta-button quantaTooltip="Tooltip Left" position="left">Left</quanta-button>
            <quanta-button quantaTooltip="Tooltip Right" position="right">Right</quanta-button>
        </div>

        <quanta-button quantaTooltip="Tooltip Below" position="below">Below</quanta-button>
      </div>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    template: `
       <div style="padding: 2rem; display: flex; justify-content: center;">
          <quanta-button quantaTooltip="This is a much longer tooltip that serves to demonstrate how the text wraps or expands the container width.">
             Long Tooltip
          </quanta-button>
       </div>
    `,
  }),
};

export const DarkTheme: Story = {
  render: () => ({
    template: `
          <div data-theme="dark" style="background: #121212; padding: 3rem; display: flex; justify-content: center;">
             <quanta-button quantaTooltip="Dark Theme Tooltip">Hover Me (Dark)</quanta-button>
          </div>
        `,
  }),
};
