import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuenow]': 'indeterminate() ? null : value()',
    '[attr.role]': '"progressbar"',
    '[class.quanta-circular-progress-indeterminate]': 'indeterminate()',
  },
  imports: [CommonModule],
  selector: 'quanta-circular-progress',
  styleUrl: './circular-progress.component.scss',
  template: `
    <svg class="quanta-circular-progress-svg" viewBox="0 0 48 48">
      <circle
        class="quanta-circular-progress-circle"
        cx="24"
        cy="24"
        r="20"
        [style.stroke-dashoffset]="dashOffset()"
      ></circle>
    </svg>
  `,
})
export class QuantaCircularProgressComponent {
  max = input<number>(100);
  value = input<number>(0);
  // Radius = 20, Circumference ~= 125.66
  private circumference = 2 * Math.PI * 20;

  dashOffset = computed(() => {
    if (this.indeterminate()) {
      return null; // CSS animation handles it
    }
    if (this.max() === 0) {
      return this.circumference; // Show empty when max is 0
    }
    const progress = this.value() / this.max();
    // Offset = Circumference - (Progress * Circumference)
    return this.circumference * (1 - progress);
  });

  indeterminate = input<boolean>(false);
}
