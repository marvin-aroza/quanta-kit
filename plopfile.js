module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['atoms', 'molecules', 'organisms', 'templates', 'pages'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name (kebab-case):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'projects/ui-kit/src/lib/{{type}}/{{name}}/{{name}}.component.ts',
        template: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'quanta-{{name}}',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './{{name}}.component.html',
  styleUrls: ['./{{name}}.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Quanta{{pascalCase name}}Component {}
`,
      },
      {
        type: 'add',
        path: 'projects/ui-kit/src/lib/{{type}}/{{name}}/{{name}}.component.html',
        template: `<p>quanta-{{name}} works!</p>
`,
      },
      {
        type: 'add',
        path: 'projects/ui-kit/src/lib/{{type}}/{{name}}/{{name}}.component.scss',
        template: `:host {
  display: block;
}
`,
      },
      {
        type: 'add',
        path: 'projects/ui-kit/src/lib/{{type}}/{{name}}/{{name}}.stories.ts',
        template: `import { Meta, StoryObj } from '@storybook/angular';
import { Quanta{{pascalCase name}}Component } from './{{name}}.component';

const meta: Meta<Quanta{{pascalCase name}}Component> = {
  title: '{{pascalCase type}}/{{pascalCase name}}',
  component: Quanta{{pascalCase name}}Component,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Quanta{{pascalCase name}}Component>;

export const Default: Story = {};
`,
      },
    ],
  });
};
