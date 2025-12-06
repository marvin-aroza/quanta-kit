import { Meta, StoryObj } from '@storybook/angular';
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
      imports: [QuantaListComponent, QuantaListItemComponent],
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
      imports: [QuantaListComponent, QuantaListItemComponent],
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
      imports: [QuantaListComponent, QuantaListItemComponent],
    },
    template: `
      <quanta-list>
        <quanta-list-item headline="Wi-Fi">
          <span start class="material-icons">wifi</span>
          <span end class="material-icons">chevron_right</span>
        </quanta-list-item>
        <quanta-list-item headline="Bluetooth">
          <span start class="material-icons">bluetooth</span>
          <span end class="material-icons">chevron_right</span>
        </quanta-list-item>
        <quanta-list-item headline="Data usage">
          <span start class="material-icons">data_usage</span>
           <span end class="material-icons">chevron_right</span>
        </quanta-list-item>
      </quanta-list>
    `,
  }),
};

export const Interactive: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaListComponent, QuantaListItemComponent],
    },
    template: `
      <quanta-list>
        <quanta-list-item interactive="true" headline="Clickable Item 1" supportingText="Hover to see state layer">
           <span start class="material-icons">touch_app</span>
        </quanta-list-item>
        <quanta-list-item interactive="true" headline="Clickable Item 2" supportingText="Hover to see state layer">
           <span start class="material-icons">touch_app</span>
        </quanta-list-item>
         <quanta-list-item interactive="true" disabled="true" headline="Disabled Item" supportingText="Cannot click me">
           <span start class="material-icons">block</span>
        </quanta-list-item>
      </quanta-list>
    `,
  }),
};

export const DarkTheme: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [QuantaListComponent, QuantaListItemComponent],
    },
    template: `
      <div data-theme="dark" style="background: #121212; padding: 16px; color: #fff;">
        <quanta-list>
          <quanta-list-item headline="Dark Mode Item" supportingText="Secondary text"></quanta-list-item>
          <quanta-list-item headline="Dark Mode Item" interactive="true" supportingText="Interactive">
             <span start class="material-icons">dark_mode</span>
          </quanta-list-item>
        </quanta-list>
      </div>
    `,
  }),
};
