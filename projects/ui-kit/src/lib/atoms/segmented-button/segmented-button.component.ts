import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { QuantaSegmentComponent } from './segment.component';
import { QuantaSegmentedButtonToken } from './segmented-button.token';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.role]': 'multi() ? "group" : "radiogroup"',
    '[class.disabled]': 'disabled()',
    class: 'quanta-segmented-button',
  },
  imports: [CommonModule],
  providers: [{ provide: QuantaSegmentedButtonToken, useExisting: QuantaSegmentedButtonComponent }],
  selector: 'quanta-segmented-button',
  styleUrl: './segmented-button.component.scss',
  template: `<ng-content select="quanta-segment" />`,
})
export class QuantaSegmentedButtonComponent<T = unknown> implements QuantaSegmentedButtonToken {
  /**
   * Whether the entire group is disabled.
   */
  disabled = input<boolean>(false);

  /**
   * Whether multiple segments can be selected.
   * Default: false
   */
  multi = input<boolean>(false);

  segments = contentChildren<QuantaSegmentComponent>(QuantaSegmentComponent);

  /**
   * The selected value(s).
   * Single select: T | null
   * Multi select: T[]
   */
  selected = model<null | T | T[]>(null);

  constructor() {
    effect(() => {
      const currentSelected = this.selected();
      const isMulti = this.multi();
      const segments = this.segments();

      segments.forEach((segment: QuantaSegmentComponent) => {
        segment.isMulti.set(isMulti);
        segment.hostDisabled.set(this.disabled() || segment.disabled()); // Combine group and local disabled

        if (isMulti) {
          const selArray = Array.isArray(currentSelected) ? currentSelected : [];
          segment.isSelected.set(selArray.includes(segment.value() as T));
        } else {
          segment.isSelected.set(currentSelected === (segment.value() as T));
        }
      });
    });
  }

  toggle(value: unknown) {
    if (this.disabled()) return;

    const isMulti = this.multi();
    const current = this.selected();

    if (isMulti) {
      const currentArray = (Array.isArray(current) ? current : []) as T[];
      if (currentArray.includes(value as T)) {
        this.selected.set(currentArray.filter((v) => v !== value));
      } else {
        this.selected.set([...currentArray, value as T]);
      }
    } else {
      // Single select behavior
      this.selected.set(value as T);
    }
  }
}
