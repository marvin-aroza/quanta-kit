import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaDialogComponent } from './dialog.component';

// ... (rest of imports)

// ...

const meta: Meta<QuantaDialogComponent> = {
  argTypes: {
    closeOnScrimClick: { control: 'boolean' },
    headline: { control: 'text' },
    icon: { control: 'text' },
    open: { control: 'boolean' },
  },
  component: QuantaDialogComponent,
  decorators: [
    moduleMetadata({
      imports: [QuantaButtonComponent],
    }),
  ],
  parameters: {
    // Dialogs often need to escape the canvas in docs mode, but we'll try inline first.
    // 'layout: fullscreen' might be cleaner.
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Molecules/Dialog',
};

export default meta;
type Story = StoryObj<QuantaDialogComponent>;

export const Basic: Story = {
  args: {
    headline: 'Dialog Title',
    open: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f0f0f0;">
        <quanta-button (click)="open = true">Open Dialog</quanta-button>
        
        <quanta-dialog [open]="open" (openChange)="open = $event" [headline]="headline" [icon]="icon" [closeOnScrimClick]="closeOnScrimClick">
           <p>This is a basic dialog with some content to demonstrate the layout and styling.</p>
           
           <div actions>
             <quanta-button variant="text" (click)="open = false">Cancel</quanta-button>
             <quanta-button variant="text" (click)="open = false">OK</quanta-button>
           </div>
        </quanta-dialog>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: {
    headline: 'Delete File?',
    icon: 'delete',
    open: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f0f0f0;">
         <quanta-button (click)="open = true">Open Alert</quanta-button>

         <quanta-dialog [open]="open" (openChange)="open = $event" [headline]="headline" [icon]="icon">
           <p>This action cannot be undone. Are you sure you want to permanently delete this item?</p>
           
           <div actions>
             <quanta-button variant="text" (click)="open = false">Cancel</quanta-button>
             <quanta-button variant="filled" (click)="open = false">Delete</quanta-button>
           </div>
        </quanta-dialog>
      </div>
    `,
  }),
};

export const Interaction: Story = {
  args: {
    headline: 'Interactive Dialog',
    open: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open Dialog', async () => {
      const openBtn = canvas.getByText('Open Dialog');
      await userEvent.click(openBtn);

      await waitFor(async () => {
        const dialogHeadline = await canvas.findByText('Interactive Dialog');
        await expect(dialogHeadline).toBeVisible();
      });
    });

    await step('Close via Action', async () => {
      const closeBtn = await canvas.findByText('Close');
      await userEvent.click(closeBtn);

      await waitFor(async () => {
        const dialogHeadline = canvas.queryByText('Interactive Dialog');
        await expect(dialogHeadline).not.toBeVisible();
      });
    });
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f0f0f0;">
        <quanta-button (click)="open = true">Open Dialog</quanta-button>
        
        <quanta-dialog [open]="open" (openChange)="open = $event" [headline]="headline">
           <p>Click the button below to close me.</p>
           <div actions>
             <quanta-button variant="text" (click)="open = false">Close</quanta-button>
           </div>
        </quanta-dialog>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: {
    headline: 'Dark Theme Dialog',
    open: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="height: 300px; display: flex; align-items: center; justify-content: center; background: #121212; color: #fff;">
        <quanta-button (click)="open = true" style="margin-bottom: 20px;">Open Dark Dialog</quanta-button>
        
        <quanta-dialog [open]="open" (openChange)="open = $event" [headline]="headline">
           <p>This dialog is rendered inside a container with <code>data-theme="dark"</code>.</p>
           
           <div actions>
             <quanta-button variant="text" (click)="open = false">Cancel</quanta-button>
             <quanta-button variant="filled" (click)="open = false">Confirm</quanta-button>
           </div>
        </quanta-dialog>
      </div>
    `,
  }),
};
