import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaTabComponent } from './tab.component';
import { QuantaTabsComponent } from './tabs.component';

const meta: Meta<QuantaTabsComponent> = {
  argTypes: {
    selectedIndex: { control: 'number' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
  component: QuantaTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [QuantaTabComponent],
    }),
  ],
  subcomponents: { QuantaTabComponent },
  tags: ['autodocs'],
  title: 'Molecules/Tabs',
};

export default meta;
type Story = StoryObj<QuantaTabsComponent>;

export const Primary: Story = {
  args: {
    selectedIndex: 0,
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-tabs [variant]="variant" [selectedIndex]="selectedIndex">
        <quanta-tab label="Tab 1" icon="">
          <div style="padding: 24px; background: #eee;">Content for Tab 1</div>
        </quanta-tab>
        <quanta-tab label="Tab 2" icon="">
           <div style="padding: 24px; background: #ddd;">Content for Tab 2</div>
        </quanta-tab>
        <quanta-tab label="Tab 3 (Disabled)" icon="" [disabled]="true">
           <div style="padding: 24px;">Content for Tab 3</div>
        </quanta-tab>
        <quanta-tab label="Tab 4">
           <div style="padding: 24px; background: #ccc;">Content for Tab 4 (No Icon)</div>
        </quanta-tab>
      </quanta-tabs>
    `,
  }),
};

export const Secondary: Story = {
  args: {
    selectedIndex: 1,
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-tabs [variant]="variant" [selectedIndex]="selectedIndex">
        <quanta-tab label="Flights">
           <p>Flights Content</p>
        </quanta-tab>
        <quanta-tab label="Trips">
           <p>Trips Content</p>
        </quanta-tab>
        <quanta-tab label="Explore">
           <p>Explore Content</p>
        </quanta-tab>
      </quanta-tabs>
    `,
  }),
};

export const Scrollable: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 320px; border: 1px solid #ccc;">
        <quanta-tabs [variant]="variant">
          <quanta-tab label="Tab 1"></quanta-tab>
          <quanta-tab label="Tab 2"></quanta-tab>
          <quanta-tab label="Tab 3"></quanta-tab>
          <quanta-tab label="Tab 4"></quanta-tab>
          <quanta-tab label="Tab 5"></quanta-tab>
          <quanta-tab label="Tab 6"></quanta-tab>
          <quanta-tab label="Tab 7"></quanta-tab>
        </quanta-tabs>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme Tabs</h3>
        
        <h4 style="margin-bottom: 8px;">Primary</h4>
        <quanta-tabs variant="primary" [selectedIndex]="0">
          <quanta-tab label="Item 1" icon="">
            <div style="padding: 16px;">Content 1</div>
          </quanta-tab>
          <quanta-tab label="Item 2" icon="">
            <div style="padding: 16px;">Content 2</div>
          </quanta-tab>
        </quanta-tabs>

        <h4 style="margin-bottom: 8px; margin-top: 24px;">Secondary</h4>
        <quanta-tabs variant="secondary" [selectedIndex]="0">
          <quanta-tab label="Flights"></quanta-tab>
          <quanta-tab label="Trips"></quanta-tab>
          <quanta-tab label="Explore"></quanta-tab>
        </quanta-tabs>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    selectedIndex: 0,
    variant: 'primary',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    // Check initial state
    await step('Initial State', async () => {
      await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      await expect(canvas.getByText('Content for First Tab')).toBeVisible();
      await expect(canvas.queryByText('Content for Second Tab')).not.toBeVisible();
    });

    // Click second tab
    await step('Select Second Tab', async () => {
      await userEvent.click(tabs[1]);
      await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      await expect(canvas.getByText('Content for Second Tab')).toBeVisible();
      await expect(canvas.queryByText('Content for First Tab')).not.toBeVisible();
    });

    // Verify disabled tab
    await step('Verify Disabled Tab', async () => {
      // User cannot click disabled tab (pointer-events: none), so we just verify state
      await expect(tabs[2]).toHaveAttribute('aria-disabled', 'true');

      // Should still be on second tab
      await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      await expect(canvas.getByText('Content for Second Tab')).toBeVisible();
    });
  },
  render: (args) => ({
    props: args,
    template: `
      <quanta-tabs [variant]="variant" [selectedIndex]="selectedIndex">
        <quanta-tab label="First">
          <p class="content-one">Content for First Tab</p>
        </quanta-tab>
        <quanta-tab label="Second">
          <p class="content-two">Content for Second Tab</p>
        </quanta-tab>
        <quanta-tab label="Third" [disabled]="true">
          <p class="content-three">Content for Third Tab</p>
        </quanta-tab>
      </quanta-tabs>
    `,
  }),
};
