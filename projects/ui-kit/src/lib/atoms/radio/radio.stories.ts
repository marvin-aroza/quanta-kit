import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { QuantaRadioButtonComponent } from './radio-button.component';
import { QuantaRadioGroupComponent } from './radio-group.component';

const meta: Meta<QuantaRadioGroupComponent> = {
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    value: { control: 'text' },
  },
  component: QuantaRadioGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [QuantaRadioButtonComponent, ReactiveFormsModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <quanta-radio-group [name]="name" [value]="value" [disabled]="disabled" [required]="required">
        <quanta-radio-button value="option1" label="Option 1"></quanta-radio-button>
        <quanta-radio-button value="option2" label="Option 2"></quanta-radio-button>
        <quanta-radio-button value="option3" label="Option 3" [disabled]="true"></quanta-radio-button>
      </quanta-radio-group>
    `,
  }),
  tags: ['autodocs'],
  title: 'Atoms/Radio',
};

export default meta;
type Story = StoryObj<QuantaRadioGroupComponent>;

export const Default: Story = {
  args: {
    name: 'default-group',
    value: null,
  },
};

export const PreSelected: Story = {
  args: {
    name: 'preselected-group',
    value: 'option2',
  },
};

export const DisabledGroup: Story = {
  args: {
    disabled: true,
    name: 'disabled-group',
    value: 'option1',
  },
};

export const ReactiveForms: Story = {
  render: () => ({
    props: {
      control: new FormControl('option2'),
    },
    template: `
      <quanta-radio-group [formControl]="control" name="reactive-group">
        <quanta-radio-button value="option1" label="Option 1"></quanta-radio-button>
        <quanta-radio-button value="option2" label="Option 2"></quanta-radio-button>
        <quanta-radio-button value="option3" label="Option 3"></quanta-radio-button>
      </quanta-radio-group>
      <p>Selected Value: {{ control.value }}</p>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    name: 'interactive-group',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option1 = canvas.getByLabelText('Option 1');
    const option2 = canvas.getByLabelText('Option 2');

    await userEvent.click(option2);
    expect(option2).toBeChecked();
    expect(option1).not.toBeChecked();

    await userEvent.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();
  },
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div data-theme="dark" style="padding: 2rem; background: var(--md-sys-color-background); color: var(--md-sys-color-on-background);">
        <h3 style="margin-top: 0;">Dark Theme</h3>
        <quanta-radio-group name="dark-theme-group" value="option2">
          <quanta-radio-button value="option1" label="Option 1"></quanta-radio-button>
          <quanta-radio-button value="option2" label="Option 2 (Selected)"></quanta-radio-button>
          <quanta-radio-button value="option3" label="Option 3 (Disabled)" [disabled]="true"></quanta-radio-button>
        </quanta-radio-group>
      </div>
    `,
  }),
};
