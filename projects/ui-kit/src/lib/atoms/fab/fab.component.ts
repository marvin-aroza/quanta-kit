import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';

export type FabSize = 'large' | 'medium' | 'small';
export type FabVariant = 'primary' | 'secondary' | 'surface' | 'tertiary';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleKeydown($event)',
    '(keydown.space)': 'handleKeydown($event)',
    '[attr.aria-label]': 'ariaLabel() || label() || null',
    '[class]': 'hostClasses()',
    role: 'button',
    tabindex: '0',
  },
  imports: [CommonModule, QuantaIconComponent],
  selector: 'quanta-fab',
  styleUrl: './fab.component.scss',
  template: `
    <quanta-icon [name]="icon()" class="quanta-fab-icon"></quanta-icon>
    @if (extended() && label()) {
      <span class="quanta-fab-label">{{ label() }}</span>
    }
  `,
})
export class QuantaFabComponent {
  /**
   * Explicit aria-label (overrides label if provided).
   */
  ariaLabel = input<string>();

  /**
   * Emitted when the FAB is clicked or activated via keyboard.
   */
  readonly clicked = output<void>();

  /**
   * Whether the FAB is extended (pill shape with label).
   * Default: false
   */
  extended = input<boolean>(false);

  /**
   * The size of the FAB.
   * Default: 'medium'
   */
  size = input<FabSize>('medium');

  /**
   * The variant of the FAB.
   * Default: 'primary'
   */
  variant = input<FabVariant>('primary');

  hostClasses = computed(() => {
    return [
      'quanta-fab',
      `variant-${this.variant()}`,
      `size-${this.size()}`,
      this.extended() ? 'extended' : '',
    ].join(' ');
  });

  /**
   * The icon to display.
   * Required.
   */
  icon = input.required<string>();

  /**
   * The label to display when extended.
   */
  label = input<string>();

  protected handleClick(event: Event): void {
    event.stopPropagation();
    this.clicked.emit();
  }

  protected handleKeydown(event: Event): void {
    event.preventDefault();
    this.clicked.emit();
  }
}
