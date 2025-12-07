import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaBottomAppBarComponent } from './bottom-app-bar.component';

// Mock Icon Button for demo until we have a real one or usage of QuantaButton
// Actually we have QuantaButton, let's use it as icon button if poss or just QuantaButton
// But wait, the task list says "Implement Icon Button" was done (id: 100).
// Let's check public-api or file structure.
// I'll assume QuantaButtonComponent can be used or I'll check for IconButton.
// Task 100 says "Implement Icon Button" [x].
// Let's assume it exists. I'll include it.

@Component({
  imports: [QuantaIconComponent],
  selector: 'quanta-icon-button-mock',
  standalone: true,
  template: `
    <button
      style="background:none; border:none; cursor:pointer; padding: 12px; border-radius: 50%; display:flex; align-items:center; justify-content:center; color: inherit;"
    >
      <quanta-icon [name]="icon"></quanta-icon>
    </button>
  `,
})
class MockIconButton {
  icon = 'help';
}

const meta: Meta<QuantaBottomAppBarComponent> = {
  component: QuantaBottomAppBarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, QuantaButtonComponent, QuantaIconComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 200px; position: relative; border: 1px solid #ccc; overflow: hidden; display: flex; flex-direction: column-reverse;">
        <quanta-bottom-app-bar>
          <ng-container ngProjectAs="[navigation-icon]">
            <quanta-button variant="text"><quanta-icon name="menu"></quanta-icon></quanta-button>
          </ng-container>
          <ng-container ngProjectAs="[actions]">
            <quanta-button variant="text"><quanta-icon name="search"></quanta-icon></quanta-button>
            <quanta-button variant="text"><quanta-icon name="favorite"></quanta-icon></quanta-button>
          </ng-container>
          <ng-container ngProjectAs="[fab]">
            <quanta-button variant="filled" icon="add">New</quanta-button>
          </ng-container>
        </quanta-bottom-app-bar>
      </div>
    `,
  }),
  tags: ['autodocs'],
  title: 'Molecules/Bottom App Bar',
};

export default meta;

export const Default: StoryObj<QuantaBottomAppBarComponent> = {};

export const NoFab: StoryObj<QuantaBottomAppBarComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 200px; position: relative; border: 1px solid #ccc; overflow: hidden; display: flex; flex-direction: column-reverse;">
        <quanta-bottom-app-bar>
          <ng-container ngProjectAs="[navigation-icon]">
             <quanta-button variant="text"><quanta-icon name="menu"></quanta-icon></quanta-button>
          </ng-container>
          <ng-container ngProjectAs="[actions]">
             <quanta-button variant="text"><quanta-icon name="search"></quanta-icon></quanta-button>
             <quanta-button variant="text"><quanta-icon name="more_vert"></quanta-icon></quanta-button>
          </ng-container>
        </quanta-bottom-app-bar>
      </div>
    `,
  }),
};

export const DarkTheme: StoryObj<QuantaBottomAppBarComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="height: 200px; position: relative; border: 1px solid #333; overflow: hidden; display: flex; flex-direction: column-reverse; background: #121212;">
        <quanta-bottom-app-bar>
          <ng-container ngProjectAs="[navigation-icon]">
            <quanta-button variant="text"><quanta-icon name="menu"></quanta-icon></quanta-button>
          </ng-container>
          <ng-container ngProjectAs="[actions]">
            <quanta-button variant="text"><quanta-icon name="search"></quanta-icon></quanta-button>
          </ng-container>
          <ng-container ngProjectAs="[fab]">
             <quanta-button variant="filled" icon="edit">Edit</quanta-button>
          </ng-container>
        </quanta-bottom-app-bar>
      </div>
    `,
  }),
};
