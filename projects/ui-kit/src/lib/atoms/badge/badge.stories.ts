import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaBadgeComponent } from './badge.component';

const meta: Meta<QuantaBadgeComponent> = {
  component: QuantaBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, QuantaIconComponent],
    }),
  ],
  tags: ['autodocs'],
  title: 'Atoms/Badge',
};

export default meta;

export const Dot: StoryObj<QuantaBadgeComponent> = {
  args: {
    dot: true,
  },
};

export const SingleDigit: StoryObj<QuantaBadgeComponent> = {
  args: {
    count: 3,
  },
};

export const MultiDigit: StoryObj<QuantaBadgeComponent> = {
  args: {
    count: 25,
  },
};

export const MaxCount: StoryObj<QuantaBadgeComponent> = {
  args: {
    count: 1000,
    maxCount: 999,
  },
};

export const OnIcon: StoryObj<QuantaBadgeComponent> = {
  args: {
    count: 5,
    dot: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; display: inline-block;">
        <quanta-icon name="notifications" style="font-size: 24px;"></quanta-icon>
        <quanta-badge [count]="count" [dot]="dot" style="position: absolute; top: -2px; right: -2px;"></quanta-badge>
      </div>
    `,
  }),
};

export const DarkTheme: StoryObj<QuantaBadgeComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="background-color: #1c1b1f; color: #e6e1e5; padding: 24px;">
        <div style="position: relative; display: inline-block; margin-right: 32px;">
           <quanta-icon name="mail" style="font-size: 24px; color: #e6e1e5;"></quanta-icon>
           <quanta-badge [count]="3" style="position: absolute; top: -2px; right: -2px;"></quanta-badge>
        </div>
        <div style="position: relative; display: inline-block;">
           <quanta-icon name="notifications" style="font-size: 24px; color: #e6e1e5;"></quanta-icon>
           <quanta-badge [dot]="true" style="position: absolute; top: -2px; right: 0;"></quanta-badge>
        </div>
      </div>
    `,
  }),
};
