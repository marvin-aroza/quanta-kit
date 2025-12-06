import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { QuantaIconComponent } from '../icon/icon.component';

export type IconButtonVariant = 'filled' | 'outlined' | 'standard' | 'tonal';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'onClick($event)',
    '(keydown.enter)': 'onKeydown($event)',
    '(keydown.space)': 'onKeydown($event)',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-pressed]': 'toggle() ? selected() : null',
    '[attr.role]': '"button"',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[class.disabled]': 'disabled()',
    '[class.filled]': 'variant() === "filled"',
    '[class.outlined]': 'variant() === "outlined"',
    '[class.quanta-icon-button]': 'true',
    '[class.selected]': 'selected()',
    '[class.standard]': 'variant() === "standard"',
    '[class.tonal]': 'variant() === "tonal"',
  },
  imports: [CommonModule, QuantaIconComponent],
  selector: 'button[quanta-icon-button], a[quanta-icon-button], quanta-icon-button',
  styleUrls: ['./icon-button.component.scss'],
  template: `
    <div class="state-layer"></div>
    <!-- Icon Content -->
    <ng-content></ng-content>
    @if (icon()) {
      <quanta-icon [name]="icon()"></quanta-icon>
    }
  `,
})
export class QuantaIconButtonComponent {
  disabled = input<boolean>(false);
  icon = input<string>();
  selected = model<boolean>(false);
  toggle = input<boolean>(false);
  variant = input<IconButtonVariant>('standard');

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  onClick(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.toggle()) {
      this.selected.update((v) => !v);
    }
  }

  onKeydown(event: Event) {
    if (this.disabled()) {
      return;
    }
    const keyboardEvent = event as KeyboardEvent;
    // Prevent default scrolling for Space
    if (keyboardEvent.key === ' ') {
      event.preventDefault();
    }
    // Trigger click logic
    this.onClick(event);
  }
}
