import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { QuantaIconComponent } from '../../atoms/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'onClick($any($event))',
    '(keydown.enter)': 'handleKeydown($any($event))',
    '(keydown.space)': 'handleKeydown($any($event))',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[class.disabled]': 'disabled()',
    class: 'quanta-menu-item',
    role: 'menuitem',
  },
  imports: [CommonModule, QuantaIconComponent],
  selector: 'quanta-menu-item',
  styleUrl: './menu-item.component.scss',
  template: `
    <div class="quanta-menu-item-content" [class.disabled]="disabled()">
      <!-- State Layer -->
      <div class="quanta-state-layer"></div>

      <!-- Icon Slot -->
      @if (icon()) {
        <quanta-icon class="quanta-menu-item-icon" [name]="icon()"></quanta-icon>
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
  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  headline = input<string>();
  icon = input<string>();

  handleKeydown(event: KeyboardEvent) {
    if (this.disabled()) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.elementRef.nativeElement.click();
    }
  }

  onClick(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
