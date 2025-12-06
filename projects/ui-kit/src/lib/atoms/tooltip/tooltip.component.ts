import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'quanta-tooltip',
  },
  imports: [CommonModule],
  selector: 'quanta-tooltip',
  standalone: true,
  styleUrl: './tooltip.component.scss',
  template: `{{ text() }}`,
})
export class QuantaTooltipComponent {
  text = input<string>('');
}
