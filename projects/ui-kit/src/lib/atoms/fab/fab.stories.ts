import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaFabComponent } from './fab.component';

const meta: Meta<QuantaFabComponent> = {
  component: QuantaFabComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, QuantaIconComponent],
    }),
  ],
  tags: ['autodocs'],
  title: 'Atoms/FAB',
};

export default meta;

export const Primary_Medium: StoryObj<QuantaFabComponent> = {
  args: {
    icon: 'edit',
    size: 'medium',
    variant: 'primary',
  },
};

export const Surface_Small: StoryObj<QuantaFabComponent> = {
  args: {
    icon: 'add',
    size: 'small',
    variant: 'surface',
  },
};

export const Large_Tertiary: StoryObj<QuantaFabComponent> = {
  args: {
    icon: 'palette',
    size: 'large',
    variant: 'tertiary',
  },
};

export const Extended: StoryObj<QuantaFabComponent> = {
  args: {
    extended: true,
    icon: 'navigation',
    label: 'Navigate',
    variant: 'secondary',
  },
};

export const AllVariants: StoryObj<QuantaFabComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <quanta-fab icon="edit" variant="primary"></quanta-fab>
        <quanta-fab icon="edit" variant="surface"></quanta-fab>
        <quanta-fab icon="edit" variant="secondary"></quanta-fab>
        <quanta-fab icon="edit" variant="tertiary"></quanta-fab>
      </div>
    `,
  }),
};

export const DarkTheme: StoryObj<QuantaFabComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="background-color: #1c1b1f; padding: 32px; display: flex; gap: 16px; align-items: center;">
        <quanta-fab icon="edit" variant="primary"></quanta-fab>
        <quanta-fab icon="add" variant="secondary"></quanta-fab>
        <quanta-fab icon="palette" variant="tertiary"></quanta-fab>
        <quanta-fab icon="navigation" label="Navigate" extended="true" variant="surface"></quanta-fab>
      </div>
    `,
  }),
};
