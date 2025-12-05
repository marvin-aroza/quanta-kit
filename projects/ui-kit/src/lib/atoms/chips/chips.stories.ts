import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaChipSetComponent } from './chip-set.component';
import { QuantaChipComponent } from './chip.component';

type ChipArgs = QuantaChipComponent & { singleSelection?: boolean };

const meta: Meta<ChipArgs> = {
  args: {
    disabled: false,
    label: 'Chip',
    removable: false,
    selected: false,
    singleSelection: false,
    variant: 'assist',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    label: { control: 'text' },
    removable: { control: 'boolean' },
    selected: { control: 'boolean' },
    singleSelection: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['assist', 'filter', 'input', 'suggestion'],
    },
  },
  component: QuantaChipComponent,
  decorators: [
    moduleMetadata({
      imports: [QuantaChipSetComponent],
    }),
  ],
  subcomponents: { QuantaChipSetComponent },
  tags: ['autodocs'],
  title: 'Atoms/Chips',
};

export default meta;

export const Assist: StoryObj<ChipArgs> = {
  args: {
    icon: 'event', // Placeholder, won't render icon unless we impl icon lookup or projection
    variant: 'assist',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-chip-set>
        <quanta-chip [variant]="variant" [label]="label" [disabled]="disabled">
          <span start>★</span> <!-- Projected icon -->
        </quanta-chip>
        <quanta-chip [variant]="variant" label="Assist Chip 2" [disabled]="disabled"></quanta-chip>
      </quanta-chip-set>
    `,
  }),
};

export const Filter: StoryObj<ChipArgs> = {
  args: {
    selected: true,
    variant: 'filter',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-chip-set>
        <quanta-chip variant="filter" label="Filter 1" [selected]="true"></quanta-chip>
        <quanta-chip variant="filter" label="Filter 2" [selected]="false"></quanta-chip>
        <quanta-chip variant="filter" label="Filter 3" [selected]="false" [disabled]="true"></quanta-chip>
      </quanta-chip-set>
    `,
  }),
};

export const Input: StoryObj<ChipArgs> = {
  args: {
    removable: true,
    variant: 'input',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-chip-set>
        <quanta-chip variant="input" label="Apple" [removable]="true"></quanta-chip>
        <quanta-chip variant="input" label="Banana" [removable]="true"></quanta-chip>
        <quanta-chip variant="input" label="Cherry (Disabled)" [removable]="true" [disabled]="true"></quanta-chip>
      </quanta-chip-set>
    `,
  }),
};

export const Suggestion: StoryObj<ChipArgs> = {
  args: {
    variant: 'suggestion',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-chip-set>
        <quanta-chip variant="suggestion" label="Suggestion 1"></quanta-chip>
        <quanta-chip variant="suggestion" label="Suggestion 2"></quanta-chip>
      </quanta-chip-set>
    `,
  }),
};
