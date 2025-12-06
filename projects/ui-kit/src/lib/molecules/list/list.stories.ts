import { Meta, StoryObj } from '@storybook/angular';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaListItemComponent } from './list-item.component';
import { QuantaListComponent } from './list.component';

const meta: Meta<QuantaListComponent> = {
  component: QuantaListComponent,
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="max-width: 400px; background: var(--md-sys-color-surface);">${story().template}</div>`,
    }),
  ],
  tags: ['autodocs'],
  title: 'Molecules/List',
};

export default meta;
type Story = StoryObj<QuantaListComponent>;

export const Basic: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaListComponent, QuantaListItemComponent, QuantaIconComponent],
    },
    template: `
      <quanta-list>
        <quanta-list-item headline="Single-line item"></quanta-list-item>
        <quanta-list-item headline="Single-line item"></quanta-list-item>
        <quanta-list-item headline="Single-line item"></quanta-list-item>
      </quanta-list>
    `,
  }),
};

export const TwoLine: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaListComponent, QuantaListItemComponent, QuantaIconComponent],
    },
    template: `
      <quanta-list>
        <quanta-list-item headline="Two-line item" supportingText="Secondary text goes here"></quanta-list-item>
        <quanta-list-item headline="Two-line item" supportingText="Secondary text goes here"></quanta-list-item>
      </quanta-list>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaListComponent, QuantaListItemComponent, QuantaIconComponent],
    },
    template: `
      <quanta-list>
        <quanta-list-item headline="Wi-Fi">
          <quanta-icon start name="wifi"></quanta-icon>
          <quanta-icon end name="chevron_right"></quanta-icon>
        </quanta-list-item>
        <quanta-list-item headline="Bluetooth">
          <quanta-icon start name="bluetooth"></quanta-icon>
          <quanta-icon end name="chevron_right"></quanta-icon>
        </quanta-list-item>
        <quanta-list-item headline="Data usage">
          <quanta-icon start name="data_usage"></quanta-icon>
           <quanta-icon end name="chevron_right"></quanta-icon>
        </quanta-list-item>
      </quanta-list>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaListComponent, QuantaListItemComponent, QuantaIconComponent],
    },
    template: `
      <quanta-list>
        <quanta-list-item interactive="true" headline="Clickable Item 1" supportingText="Hover to see state layer">
           <quanta-icon start name="touch_app"></quanta-icon>
        </quanta-list-item>
        <quanta-list-item interactive="true" headline="Clickable Item 2" supportingText="Hover to see state layer">
           <quanta-icon start name="touch_app"></quanta-icon>
        </quanta-list-item>
         <quanta-list-item interactive="true" disabled="true" headline="Disabled Item" supportingText="Cannot click me">
           <quanta-icon start name="block"></quanta-icon>
        </quanta-list-item>
      </quanta-list>
    `,
  }),
};

export const DarkTheme: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaListComponent, QuantaListItemComponent, QuantaIconComponent],
    },
    template: `
      <div data-theme="dark" style="background: #121212; padding: 16px; color: #fff;">
        <quanta-list>
          <quanta-list-item headline="Dark Mode Item" supportingText="Secondary text"></quanta-list-item>
          <quanta-list-item headline="Dark Mode Item" interactive="true" supportingText="Interactive">
             <quanta-icon start name="dark_mode"></quanta-icon>
          </quanta-list-item>
        </quanta-list>
      </div>
    `,
  }),
};
