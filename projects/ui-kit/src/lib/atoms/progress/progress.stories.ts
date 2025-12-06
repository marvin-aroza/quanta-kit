import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { QuantaCircularProgressComponent } from './circular-progress.component';
import { QuantaLinearProgressComponent } from './linear-progress.component';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [QuantaLinearProgressComponent, QuantaCircularProgressComponent],
    }),
  ],
  tags: ['autodocs'],
  title: 'Atoms/Progress',
};

export default meta;

export const LinearDeterminate: StoryObj<QuantaLinearProgressComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px; padding: 20px;">
        <quanta-linear-progress [value]="50" [max]="100" aria-label="Loading progress"></quanta-linear-progress>
      </div>
    `,
  }),
};

export const LinearIndeterminate: StoryObj<QuantaLinearProgressComponent> = {
  render: () => ({
    template: `
      <div style="width: 300px; padding: 20px;">
        <quanta-linear-progress [indeterminate]="true" aria-label="Loading indefinitely"></quanta-linear-progress>
      </div>
    `,
  }),
};

export const CircularDeterminate: StoryObj<QuantaCircularProgressComponent> = {
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 20px;">
        <quanta-circular-progress [value]="75" [max]="100" aria-label="Loading progress"></quanta-circular-progress>
      </div>
    `,
  }),
};

export const CircularIndeterminate: StoryObj<QuantaCircularProgressComponent> = {
  render: () => ({
    template: `
      <div style="padding: 20px;">
        <quanta-circular-progress [indeterminate]="true" aria-label="Loading indefinitely"></quanta-circular-progress>
      </div>
    `,
  }),
};

export const DarkTheme: StoryObj = {
  render: () => ({
    template: `
      <div data-theme="dark" style="background: #121212; padding: 40px; color: white;">
        <h3>Linear</h3>
        <div style="width: 300px; margin-bottom: 20px;">
             <quanta-linear-progress [indeterminate]="true" aria-label="Loading linear in dark mode"></quanta-linear-progress>
        </div>
        <h3>Circular</h3>
        <quanta-circular-progress [indeterminate]="true" aria-label="Loading circular in dark mode"></quanta-circular-progress>
      </div>
    `,
  }),
};
