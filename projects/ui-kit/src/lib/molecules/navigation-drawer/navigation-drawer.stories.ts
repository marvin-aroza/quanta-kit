import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaNavigationDrawerItemComponent } from './navigation-drawer-item/navigation-drawer-item.component';
import { QuantaNavigationDrawerComponent } from './navigation-drawer.component';

const meta: Meta<QuantaNavigationDrawerComponent> = {
  component: QuantaNavigationDrawerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, QuantaNavigationDrawerItemComponent, QuantaButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  title: 'Molecules/Navigation Drawer',
};

export default meta;

export const Standard: StoryObj<QuantaNavigationDrawerComponent> = {
  render: (args) => {
    const activeItem = signal('inbox');
    return {
      props: { ...args, activeItem, setActive: (id: string) => activeItem.set(id) },
      template: `
        <div style="display: flex; height: 400px; border: 1px solid #ccc; overflow: hidden;">
          <quanta-navigation-drawer [opened]="true" mode="standard" ariaLabel="Main navigation">
            <h2 style="padding: 0 28px; font-family: sans-serif; font-size: 1.2rem; opacity: 0.7; margin: 0;">Mail</h2>
            <quanta-navigation-drawer-item 
              icon="inbox" 
              label="Inbox" 
              [active]="activeItem() === 'inbox'"
              (itemClick)="setActive('inbox')"
            ></quanta-navigation-drawer-item>
            <quanta-navigation-drawer-item 
              icon="send" 
              label="Outbox" 
              [active]="activeItem() === 'outbox'"
              (itemClick)="setActive('outbox')"
            ></quanta-navigation-drawer-item>
            <quanta-navigation-drawer-item 
              icon="favorite" 
              label="Favorites" 
              [active]="activeItem() === 'favorites'"
              (itemClick)="setActive('favorites')"
            ></quanta-navigation-drawer-item>
             <quanta-navigation-drawer-item 
              icon="delete" 
              label="Trash" 
              [active]="activeItem() === 'trash'"
              (itemClick)="setActive('trash')"
            ></quanta-navigation-drawer-item>
          </quanta-navigation-drawer>
          <div style="flex: 1; padding: 24px; background: #fff;">
            <h1>Main Content</h1>
            <p>The standard drawer sits next to the content.</p>
          </div>
        </div>
      `,
    };
  },
};

export const Modal: StoryObj<QuantaNavigationDrawerComponent> = {
  render: () => {
    const isOpen = signal(false);
    return {
      props: { isOpen, toggle: () => isOpen.update((v) => !v) },
      template: `
        <div style="position: relative; height: 400px; border: 1px solid #ccc; overflow: hidden; background: #fff;">
          <div style="padding: 24px;">
            <quanta-button (clicked)="toggle()">Toggle Modal Drawer</quanta-button>
            <h1>Page Content</h1>
            <p>Click the button to open the modal drawer.</p>
          </div>
          
          <quanta-navigation-drawer [opened]="isOpen()" mode="modal" (scrimClick)="toggle()" ariaLabel="Main menu">
            <h2 style="padding: 0 28px; font-family: sans-serif; font-size: 1.2rem; margin: 0;">Menu</h2>
            <quanta-navigation-drawer-item icon="settings" label="Settings"></quanta-navigation-drawer-item>
            <quanta-navigation-drawer-item icon="help" label="Help"></quanta-navigation-drawer-item>
          </quanta-navigation-drawer>
        </div>
      `,
    };
  },
};

export const DarkTheme: StoryObj<QuantaNavigationDrawerComponent> = {
  render: (args) => {
    const activeItem = signal('inbox');
    return {
      props: { ...args, activeItem, setActive: (id: string) => activeItem.set(id) },
      template: `
        <div data-theme="dark" style="display: flex; height: 400px; border: 1px solid #333; overflow: hidden; background: #121212; color: #e3e3e3;">
          <quanta-navigation-drawer [opened]="true" mode="standard" ariaLabel="Main navigation">
            <h2 style="padding: 0 28px; font-family: sans-serif; font-size: 1.2rem; opacity: 0.7; margin: 0;">Mail</h2>
            <quanta-navigation-drawer-item 
              icon="inbox" 
              label="Inbox" 
              [active]="activeItem() === 'inbox'"
              (itemClick)="setActive('inbox')"
            ></quanta-navigation-drawer-item>
            <quanta-navigation-drawer-item 
              icon="send" 
              label="Outbox" 
              [active]="activeItem() === 'outbox'"
              (itemClick)="setActive('outbox')"
            ></quanta-navigation-drawer-item>
             <quanta-navigation-drawer-item 
              icon="delete" 
              label="Trash" 
              [active]="activeItem() === 'trash'"
              (itemClick)="setActive('trash')"
            ></quanta-navigation-drawer-item>
          </quanta-navigation-drawer>
          <div style="flex: 1; padding: 24px;">
            <h1>Main Content</h1>
            <p>Standard drawer in Dark Theme.</p>
          </div>
        </div>
      `,
    };
  },
};
