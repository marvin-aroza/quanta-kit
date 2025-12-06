import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaSliderComponent } from './slider.component';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [QuantaSliderComponent, CommonModule],
    }),
  ],
  tags: ['autodocs'],
  title: 'Atoms/Slider',
};

export default meta;

export const Default: StoryObj<QuantaSliderComponent> = {
  args: {
    max: 100,
    min: 0,
    step: 1,
    value: 50,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px; width: 300px;">
        <quanta-slider 
          [min]="min" 
          [max]="max" 
          [step]="step" 
          [value]="value" 
          (valueChange)="value = $event"
          aria-label="Volume slider">
        </quanta-slider>
        <div style="margin-top: 10px;">Value: {{ value }}</div>
      </div>
    `,
  }),
};

export const DiscreteSteps: StoryObj<QuantaSliderComponent> = {
  args: {
    value: 5,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px; width: 300px;">
        <quanta-slider 
          [min]="0" 
          [max]="10" 
          [step]="1" 
          [value]="value" 
          (valueChange)="value = $event"
          aria-label="Rating slider">
        </quanta-slider>
        <div style="margin-top: 10px;">Value: {{ value }} (Step 1)</div>
      </div>
    `,
  }),
};

export const Disabled: StoryObj<QuantaSliderComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px; width: 300px;">
        <quanta-slider [disabled]="true" [value]="30" aria-label="Disabled slider"></quanta-slider>
      </div>
    `,
  }),
};

export const DarkTheme: StoryObj<QuantaSliderComponent> = {
  args: {
    value: 75,
  },
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="background: #121212; padding: 40px; color: white; width: 350px;">
        <h3>Dark Theme</h3>
        <quanta-slider 
          [value]="value" 
          (valueChange)="value = $event"
          aria-label="Dark theme slider">
        </quanta-slider>
      </div>
    `,
  }),
};

export const Interaction: StoryObj<QuantaSliderComponent> = {
  args: {
    max: 100,
    value: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole('slider');

    // Focus and move
    await userEvent.click(slider);
    await userEvent.keyboard('[ArrowRight]');
    await userEvent.keyboard('[ArrowRight]');
    await userEvent.keyboard('[ArrowRight]');

    // Expect value to change (step is 1 default, so 3)
    // Note: updating the view might take a tick, verify text content?
    // In storybook play functions, we can assert.
    const display = canvas.getByTestId('value-display');
    await expect(display.innerText).toContain('Value: 3');
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px; width: 300px;">
        <p>Interaction Test (Press Arrow Right)</p>
        <quanta-slider 
          [value]="value"
          [max]="max"
          (valueChange)="value = $event" 
          aria-label="Interaction slider">
        </quanta-slider>
        <div data-testid="value-display">Value: {{ value }}</div>
      </div>
    `,
  }),
};
