import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaButtonComponent } from '../../atoms/button/button.component';
import { QuantaSnackbarService } from './snackbar.service';

// Helper component to trigger snackbar
@Component({
  imports: [CommonModule, QuantaButtonComponent],
  providers: [], // Service is root provided
  selector: 'quanta-snackbar-demo',
  template: `
    <div style="display: flex; gap: 10px; align-items: center;">
      <quanta-button (clicked)="openBasic()" variant="filled">Open Basic</quanta-button>
      <quanta-button (clicked)="openWithAction()" variant="outlined"
        >Open with Action</quanta-button
      >
      <quanta-button (clicked)="openLong()" variant="tonal">Open Long Duration</quanta-button>
    </div>
  `,
})
class SnackbarDemoComponent {
  private snackbar = inject(QuantaSnackbarService);

  openBasic() {
    this.snackbar.open('Message sent');
  }

  openLong() {
    this.snackbar.open('This will stay for 10 seconds', undefined, { duration: 10000 });
  }

  openWithAction() {
    this.snackbar.open('Message deleted', 'Undo');
  }
}

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SnackbarDemoComponent],
      providers: [QuantaSnackbarService], // Ensure service is available
    }),
  ],
  tags: ['autodocs'],
  title: 'Molecules/Snackbar',
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    template: `<quanta-snackbar-demo></quanta-snackbar-demo>`,
  }),
};

export const DarkTheme: StoryObj = {
  render: () => ({
    template: `
      <div data-theme="dark" style="background: #121212; padding: 20px;">
        <quanta-snackbar-demo></quanta-snackbar-demo>
      </div>
    `,
  }),
};

export const Interaction: StoryObj = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Open Basic') as HTMLElement;

    // Click button to trigger snackbar
    await userEvent.click(button);

    // Wait for snackbar to appear in the body
    // Note: Storybook's 'canvasElement' is the story wrapper. Snackbar is attached to document.body.
    // 'within(document.body)' is needed to find it.
    const body = within(document.body);
    const snackbar = (await body.findByRole('status')) as HTMLElement; // or querySelector('quanta-snackbar')

    await expect(snackbar).toBeTruthy();
    await expect(snackbar.innerText).toContain('Message sent');
  },
  render: () => ({
    template: `<quanta-snackbar-demo></quanta-snackbar-demo>`,
  }),
};
