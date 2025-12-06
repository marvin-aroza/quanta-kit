import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'quanta-list',
    role: 'list',
  },
  imports: [],
  selector: 'quanta-list',
  standalone: true,
  styleUrl: './list.component.scss',
  template: `<ng-content></ng-content>`,
})
export class QuantaListComponent {}
