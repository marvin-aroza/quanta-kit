import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaNavigationRailItemComponent } from './navigation-rail-item/navigation-rail-item.component';
import { QuantaNavigationRailComponent } from './navigation-rail.component';

const meta: Meta<QuantaNavigationRailComponent> = {
  component: QuantaNavigationRailComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        QuantaNavigationRailItemComponent,
        QuantaButtonComponent,
        QuantaIconComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  title: 'Molecules/Navigation Rail',
};

export default meta;

export const Standard: StoryObj<QuantaNavigationRailComponent> = {
  render: (args) => {
    const activeItem = signal('inbox');
    return {
      props: { ...args, activeItem, setActive: (id: string) => activeItem.set(id) },
      template: `
        <div style="display: flex; height: 500px; border: 1px solid #ccc; overflow: hidden; background-color: #fdfdfd;">
          <quanta-navigation-rail ariaLabel="Main navigation">
            <!-- Header Slot (e.g., Menu or FAB) -->
            <div header style="margin-bottom: 20px;">
                <quanta-icon name="menu" style="font-size: 24px; cursor: pointer;"></quanta-icon>
            </div>

            <quanta-navigation-rail-item 
              icon="inbox" 
              label="Inbox" 
              [active]="activeItem() === 'inbox'"
              (itemClick)="setActive('inbox')"
            ></quanta-navigation-rail-item>
            <quanta-navigation-rail-item 
              icon="send" 
              label="Outbox" 
              [active]="activeItem() === 'outbox'"
              (itemClick)="setActive('outbox')"
            ></quanta-navigation-rail-item>
            <quanta-navigation-rail-item 
              icon="favorite" 
              label="Favorites" 
              [active]="activeItem() === 'favorites'"
              (itemClick)="setActive('favorites')"
            ></quanta-navigation-rail-item>
            <quanta-navigation-rail-item 
              icon="delete" 
              label="Trash" 
              [active]="activeItem() === 'trash'"
              (itemClick)="setActive('trash')"
            ></quanta-navigation-rail-item>
          </quanta-navigation-rail>

          <div style="flex: 1; padding: 24px;">
            <h1>Content Area</h1>
            <p>The rail stays fixed on the left (80px wide typical).</p>
          </div>
        </div>
      `,
    };
  },
};

export const DarkTheme: StoryObj<QuantaNavigationRailComponent> = {
  render: (args) => {
    const activeItem = signal('inbox');
    return {
      props: { ...args, activeItem, setActive: (id: string) => activeItem.set(id) },
      template: `
        <div data-theme="dark" style="display: flex; height: 500px; border: 1px solid #333; overflow: hidden; background-color: #121212; color: #e3e3e3;">
          <quanta-navigation-rail ariaLabel="Main navigation">
             <div header style="margin-bottom: 20px;">
                <quanta-icon name="menu" style="font-size: 24px; cursor: pointer; color: #e3e3e3;"></quanta-icon>
            </div>
            
            <quanta-navigation-rail-item 
              icon="inbox" 
              label="Inbox" 
              [active]="activeItem() === 'inbox'"
              (itemClick)="setActive('inbox')"
            ></quanta-navigation-rail-item>
            <quanta-navigation-rail-item 
              icon="send" 
              label="Outbox" 
              [active]="activeItem() === 'outbox'"
              (itemClick)="setActive('outbox')"
            ></quanta-navigation-rail-item>
          </quanta-navigation-rail>

          <div style="flex: 1; padding: 24px;">
            <h1>Dark Theme</h1>
            <p>Rail adapts to surface colors.</p>
          </div>
        </div>
      `,
    };
  },
};
