import { Component, signal } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';
import { userEvent, within } from 'storybook/test';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaMenuItemComponent } from './menu-item.component';
import { QuantaMenuComponent } from './menu.component';

const meta: Meta<QuantaMenuComponent> = {
  component: QuantaMenuComponent,
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="height: 300px; padding: 20px;">${story().template}</div>`,
    }),
  ],
  tags: ['autodocs'],
  title: 'Molecules/Menu',
};

export default meta;
type Story = StoryObj<QuantaMenuComponent>;

@Component({
  imports: [QuantaMenuComponent, QuantaMenuItemComponent, QuantaButtonComponent],
  selector: 'quanta-menu-host',
  standalone: true,
  template: `
    <quanta-button (click)="isOpen.set(!isOpen())" #trigger> Open Menu </quanta-button>

    <quanta-menu [trigger]="trigger.elementRef.nativeElement" [open]="isOpen">
      <quanta-menu-item>Item 1</quanta-menu-item>
      <quanta-menu-item>Item 2</quanta-menu-item>
      <quanta-menu-item disabled="true">Disabled Item</quanta-menu-item>
    </quanta-menu>
  `,
})
class MenuHostComponent {
  isOpen = signal(false);
}

export const Basic: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [MenuHostComponent],
    },
    template: `<quanta-menu-host></quanta-menu-host>`,
  }),
};

@Component({
  imports: [QuantaMenuComponent, QuantaMenuItemComponent, QuantaButtonComponent],
  selector: 'quanta-menu-icons-host',
  standalone: true,
  template: `
    <quanta-button (click)="isOpen.set(!isOpen())" #trigger> Options </quanta-button>

    <quanta-menu [trigger]="trigger.elementRef.nativeElement" [open]="isOpen">
      <quanta-menu-item icon="edit" headline="Edit"></quanta-menu-item>
      <quanta-menu-item icon="duplicate" headline="Duplicate">
        <span end class="material-icons">content_copy</span>
      </quanta-menu-item>
      <quanta-menu-item icon="delete" headline="Delete"></quanta-menu-item>
    </quanta-menu>
  `,
})
class MenuIconsHostComponent {
  isOpen = signal(false);
}

export const WithIcons: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [MenuIconsHostComponent],
    },
    template: `<quanta-menu-icons-host></quanta-menu-icons-host>`,
  }),
};

export const DarkTheme: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [MenuHostComponent],
    },
    template: `
        <div class="quanta-dark-theme" style="background: var(--md-sys-color-background); padding: 2rem; color: var(--md-sys-color-on-background);">
          <quanta-menu-host></quanta-menu-host>
        </div>
      `,
  }),
};

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Open Menu');
    await userEvent.click(trigger);

    // Check items exist
    await canvas.findByText('Item 1');
    await canvas.findByText('Item 2');
  },
  render: () => ({
    moduleMetadata: {
      imports: [MenuHostComponent],
    },
    template: `<quanta-menu-host></quanta-menu-host>`,
  }),
};
