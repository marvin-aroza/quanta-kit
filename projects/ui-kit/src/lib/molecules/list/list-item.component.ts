import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.disabled]': 'disabled()',
    class: 'quanta-list-item',
    role: 'listitem',
  },
  imports: [CommonModule],
  selector: 'quanta-list-item',
  standalone: true,
  styleUrl: './list-item.component.scss',
  template: `
    <div
      class="quanta-list-item-content"
      [class.interactive]="interactive() && !disabled()"
      [attr.tabindex]="interactive() && !disabled() ? 0 : null"
      (keydown.enter)="handleKeydown($event)"
      (keydown.space)="handleKeydown($event)"
      [attr.role]="interactive() ? 'button' : null"
      [attr.aria-disabled]="disabled()"
    >
      <!-- State Layer (Overlay for hover/focus/press) -->
      @if (interactive() && !disabled()) {
        <div class="quanta-state-layer"></div>
      }

      <!-- Start Slot -->
      <div class="quanta-list-item-start">
        <ng-content select="[start]"></ng-content>
      </div>

      <!-- Body (Headline + Supporting Text) -->
      <div class="quanta-list-item-body">
        @if (headline()) {
          <div class="quanta-list-item-headline">{{ headline() }}</div>
        }
        @if (supportingText()) {
          <div class="quanta-list-item-supporting-text">{{ supportingText() }}</div>
        }
        <ng-content></ng-content>
      </div>

      <!-- End Slot -->
      <div class="quanta-list-item-end">
        <ng-content select="[end]"></ng-content>
      </div>
    </div>
  `,
})
export class QuantaListItemComponent {
  disabled = input<boolean>(false);
  headline = input<string>();
  interactive = input<boolean>(false);
  supportingText = input<string>();

  handleKeydown(event: Event) {
    if (!this.interactive() || this.disabled()) return;
    const keyEvent = event as KeyboardEvent;
    // Prevent default scrolling for space
    if (keyEvent.key === ' ') {
      event.preventDefault();
    }
    // Retrigger click
    event.target?.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
  }
}
