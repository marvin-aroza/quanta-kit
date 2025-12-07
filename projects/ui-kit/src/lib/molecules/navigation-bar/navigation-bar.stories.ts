import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaNavigationBarComponent } from './navigation-bar.component';
import { QuantaNavigationItemComponent } from './navigation-item/navigation-item.component';

const meta: Meta<QuantaNavigationBarComponent> = {
  component: QuantaNavigationBarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, QuantaNavigationItemComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div style="background: #fff; width: 100%; border: 1px solid #ddd;">
        <div style="height: 200px; padding: 16px;">Page content...</div>
        <quanta-navigation-bar>
          <quanta-navigation-item icon="home" label="Home" [active]="true"></quanta-navigation-item>
          <quanta-navigation-item icon="search" label="Explore"></quanta-navigation-item>
          <quanta-navigation-item icon="person" label="Profile"></quanta-navigation-item>
        </quanta-navigation-bar>
      </div>
    `,
  }),
  tags: ['autodocs'],
  title: 'Molecules/Navigation Bar',
};

export default meta;

export const Default: StoryObj<QuantaNavigationBarComponent> = {};

export const FourItems: StoryObj<QuantaNavigationBarComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="background: #fff; width: 100%; border: 1px solid #ddd;">
        <div style="height: 200px; padding: 16px;">Page content...</div>
        <quanta-navigation-bar>
          <quanta-navigation-item icon="home" label="Home" [active]="true"></quanta-navigation-item>
          <quanta-navigation-item icon="favorite" label="Saved"></quanta-navigation-item>
          <quanta-navigation-item icon="notifications" label="Updates"></quanta-navigation-item>
          <quanta-navigation-item icon="person" label="Profile"></quanta-navigation-item>
        </quanta-navigation-bar>
      </div>
    `,
  }),
};

export const DarkTheme: StoryObj<QuantaNavigationBarComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="background: #121212; color: #fff; width: 100%; border: 1px solid #333;">
        <div style="height: 200px; padding: 16px;">Page content...</div>
        <quanta-navigation-bar>
          <quanta-navigation-item icon="home" label="Home" [active]="true"></quanta-navigation-item>
          <quanta-navigation-item icon="search" label="Explore"></quanta-navigation-item>
          <quanta-navigation-item icon="history" label="History"></quanta-navigation-item>
        </quanta-navigation-bar>
      </div>
    `,
  }),
};
