import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[class.large]': '!isSmall()',
    '[class.small]': 'isSmall()',
    'aria-hidden': 'true', // Usually strictly visual
    class: 'quanta-badge',
  },
  imports: [CommonModule],
  selector: 'quanta-badge',
  styleUrl: './badge.component.scss',
  template: `
    @if (!isSmall()) {
      {{ displayValue() }}
    }
  `,
})
export class QuantaBadgeComponent {
  /**
   * The number to display in the badge.
   * If unset or 0, showing a dot (unless `dot` is false, but usually 0 implies hidden or dot).
   * For this component, let's say if count is defined, we show it.
   */
  count = input<number>();

  /**
   * Maximum number to display before showing '+'. Default 999.
   */
  maxCount = input<number>(999);

  displayValue = computed(() => {
    const c = this.count();
    if (c === undefined) return '';
    const max = this.maxCount();
    return c > max ? `${max}+` : `${c}`;
  });

  /**
   * Force small dot mode.
   */
  dot = input<boolean>(false);

  isSmall = computed(() => {
    return this.dot() || this.count() === undefined;
  });

  /**
   * Optional accessible label if this badge conveys unique info not present elsewhere.
   */
  label = input<string>();
}
