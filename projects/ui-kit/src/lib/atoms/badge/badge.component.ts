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
    '[attr.aria-hidden]': '!label() ? "true" : null',
    '[attr.aria-label]': 'label()',
    '[class.large]': '!isSmall()',
    '[class.small]': 'isSmall()',
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
   * If undefined, showing a small dot (unless `dot` input forces it).
   * Any defined number (including 0) is rendered numerically.
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
