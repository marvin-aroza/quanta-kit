import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'quanta-chip',
  styleUrl: './chip.component.scss',
  templateUrl: './chip.component.html',
})
export class QuantaChipComponent {
  disabled = input<boolean>(false);
  icon = input<string>();
  label = input.required<string>();
  removable = input<boolean>(false);
  removed = output<void>();
  selected = model<boolean>(false);
  variant = input<ChipVariant>('assist');

  protected computedClass = computed(() => {
    const classes = ['quanta-chip', this.variant()];
    if (this.selected()) classes.push('selected');
    if (this.disabled()) classes.push('disabled');
    return classes.join(' ');
  });

  protected remove(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;
    this.removed.emit();
  }

  protected toggle(): void {
    if (this.disabled()) return;
    if (this.variant() === 'filter') {
      this.selected.update((s) => !s);
    }
  }
}
