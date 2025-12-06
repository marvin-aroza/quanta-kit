import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type DividerInset = 'end' | 'none' | 'start';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.aria-orientation]': 'vertical() ? "vertical" : "horizontal"',
    '[attr.role]': '"separator"',
    '[class.quanta-divider-horizontal]': '!vertical()',
    '[class.quanta-divider-inset-end]': 'inset() === "end"',
    '[class.quanta-divider-inset-start]': 'inset() === "start"',
    '[class.quanta-divider-inset]': 'inset() === "start"', // Generic "inset" class reserved for start side
    '[class.quanta-divider-vertical]': 'vertical()',
  },
  imports: [CommonModule],
  selector: 'quanta-divider',
  styleUrl: './divider.component.scss',
  template: '',
})
export class QuantaDividerComponent {
  inset = input<DividerInset>('none');
  vertical = input<boolean>(false);
}
