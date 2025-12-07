import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';
import { QuantaTopAppBarComponent } from './top-app-bar.component';

const meta: Meta<QuantaTopAppBarComponent> = {
  component: QuantaTopAppBarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, QuantaButtonComponent, QuantaIconComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative; border: 1px solid #ccc; display: flex; flex-direction: column;">
        <quanta-top-app-bar [variant]="variant">
          <ng-container ngProjectAs="[navigationIcon]">
            <quanta-button variant="text"><quanta-icon name="menu"></quanta-icon></quanta-button>
          </ng-container>
          <span ngProjectAs="[headline]">Page Title</span>
          <ng-container ngProjectAs="[actions]">
            <quanta-button variant="text"><quanta-icon name="attach_file"></quanta-icon></quanta-button>
            <quanta-button variant="text"><quanta-icon name="event"></quanta-icon></quanta-button>
            <quanta-button variant="text"><quanta-icon name="more_vert"></quanta-icon></quanta-button>
          </ng-container>
        </quanta-top-app-bar>
        <div style="padding: 16px; min-height: 200px; background: #fafafa;">
          <p>Content goes here...</p>
        </div>
      </div>
    `,
  }),
  tags: ['autodocs'],
  title: 'Molecules/Top App Bar',
};

export default meta;

export const Small: StoryObj<QuantaTopAppBarComponent> = {
  args: {
    variant: 'small',
  },
};

export const CenterAligned: StoryObj<QuantaTopAppBarComponent> = {
  args: {
    variant: 'center-aligned',
  },
};

export const Medium: StoryObj<QuantaTopAppBarComponent> = {
  args: {
    variant: 'medium',
  },
};

export const Large: StoryObj<QuantaTopAppBarComponent> = {
  args: {
    variant: 'large',
  },
};

export const DarkTheme: StoryObj<QuantaTopAppBarComponent> = {
  args: {
    variant: 'small',
  },
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="position: relative; border: 1px solid #333; display: flex; flex-direction: column; background: #121212; color: #fff;">
        <quanta-top-app-bar [variant]="variant">
          <ng-container ngProjectAs="[navigationIcon]">
            <quanta-button variant="text"><quanta-icon name="menu"></quanta-icon></quanta-button>
          </ng-container>
          <span ngProjectAs="[headline]">Dark Theme Title</span>
          <ng-container ngProjectAs="[actions]">
            <quanta-button variant="text"><quanta-icon name="search"></quanta-icon></quanta-button>
            <quanta-button variant="text"><quanta-icon name="more_vert"></quanta-icon></quanta-button>
          </ng-container>
        </quanta-top-app-bar>
        <div style="padding: 16px; min-height: 200px;">
          <p>Scrolled content area...</p>
        </div>
      </div>
    `,
  }),
};
