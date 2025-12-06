import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'onClick($event)',
    '(keydown.enter)': 'handleKeydown($event)',
    '(keydown.space)': 'handleKeydown($event)',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[class.disabled]': 'disabled()',
    class: 'quanta-menu-item',
    role: 'menuitem',
  },
  imports: [CommonModule],
  selector: 'quanta-menu-item',
  standalone: true,
  styleUrl: './menu-item.component.scss',
  template: `
    <div class="quanta-menu-item-content" [class.disabled]="disabled()">
      <!-- State Layer -->
      <div class="quanta-state-layer"></div>

      <!-- Icon Slot -->
      @if (icon()) {
        <span class="quanta-menu-item-icon material-icons">{{ icon() }}</span>
      }

      <!-- Headline -->
      <div class="quanta-menu-item-headline">
        @if (headline()) {
          {{ headline() }}
        } @else {
          <ng-content></ng-content>
        }
      </div>

      <!-- Trailing Icon/Text -->
      <div class="quanta-menu-item-end">
        <ng-content select="[end]"></ng-content>
      </div>
    </div>
  `,
})
export class QuantaMenuItemComponent {
  disabled = input<boolean>(false);
  public elementRef = inject(ElementRef);
  headline = input<string>();
  icon = input<string>();

  handleKeydown(event: Event) {
    if (this.disabled()) return;
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === ' ' || keyEvent.key === 'Enter') {
      keyEvent.preventDefault();
      this.elementRef.nativeElement.click();
    }
  }

  onClick(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
