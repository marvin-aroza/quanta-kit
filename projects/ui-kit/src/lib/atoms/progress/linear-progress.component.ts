import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuenow]': 'indeterminate() ? null : value()',
    '[attr.role]': '"progressbar"',
    '[class.quanta-linear-progress-indeterminate]': 'indeterminate()',
  },
  imports: [CommonModule],
  selector: 'quanta-linear-progress',
  styleUrl: './linear-progress.component.scss',
  template: `
    <div
      class="quanta-linear-progress-bar"
      [style.transform]="indeterminate() ? null : 'scaleX(' + value() / max() + ')'"
    ></div>
  `,
})
export class QuantaLinearProgressComponent {
  indeterminate = input<boolean>(false);
  max = input<number>(100);
  value = input<number>(0);
}
