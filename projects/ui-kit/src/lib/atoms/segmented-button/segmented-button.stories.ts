import { CommonModule } from '@angular/common';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaSegmentComponent } from './segment.component';
import { QuantaSegmentedButtonComponent } from './segmented-button.component';

const meta: Meta<QuantaSegmentedButtonComponent> = {
  component: QuantaSegmentedButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, QuantaSegmentComponent, QuantaIconComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <quanta-segmented-button ${argsToTemplate(args)}>
        <quanta-segment value="daily" label="Daily"></quanta-segment>
        <quanta-segment value="weekly" label="Weekly"></quanta-segment>
        <quanta-segment value="monthly" label="Monthly"></quanta-segment>
      </quanta-segmented-button>
    `,
  }),
  tags: ['autodocs'],
  title: 'Atoms/Segmented Button',
};

export default meta;

export const SingleSelect: StoryObj<QuantaSegmentedButtonComponent> = {
  args: {
    multi: false,
    selected: 'daily',
  },
};

export const MultiSelect: StoryObj<QuantaSegmentedButtonComponent> = {
  args: {
    multi: true,
    selected: ['daily', 'weekly'],
  },
};

export const WithIcons: StoryObj<QuantaSegmentedButtonComponent> = {
  args: {
    multi: false,
    selected: 'songs',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-segmented-button ${argsToTemplate(args)}>
        <quanta-segment value="songs" icon="music_note" label="Songs"></quanta-segment>
        <quanta-segment value="albums" icon="album" label="Albums"></quanta-segment>
        <quanta-segment value="podcasts" icon="podcasts" label="Podcasts"></quanta-segment>
      </quanta-segmented-button>
    `,
  }),
};

export const IconsOnly: StoryObj<QuantaSegmentedButtonComponent> = {
  args: {
    multi: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-segmented-button ${argsToTemplate(args)}>
        <quanta-segment value="bold" icon="format_bold"></quanta-segment>
        <quanta-segment value="italic" icon="format_italic"></quanta-segment>
        <quanta-segment value="underlined" icon="format_underlined"></quanta-segment>
      </quanta-segmented-button>
    `,
  }),
};

export const DisabledFrame: StoryObj<QuantaSegmentedButtonComponent> = {
  args: {
    disabled: true,
    multi: false,
    selected: 'daily',
  },
};

export const DarkTheme: StoryObj<QuantaSegmentedButtonComponent> = {
  args: {
    multi: false,
    selected: 'one',
  },
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="background-color: #1c1b1f; padding: 20px;">
        <quanta-segmented-button ${argsToTemplate(args)}>
          <quanta-segment value="one" label="One"></quanta-segment>
          <quanta-segment value="two" label="Two"></quanta-segment>
          <quanta-segment value="three" label="Three"></quanta-segment>
        </quanta-segmented-button>
      </div>
    `,
  }),
};
