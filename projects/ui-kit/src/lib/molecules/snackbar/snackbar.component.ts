import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Component for displaying snackbar notifications.
 * Typically dynamic created by QuantaSnackbarService.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[class.quanta-snackbar-open]': 'isOpen()',
  },
  imports: [CommonModule],
  selector: 'quanta-snackbar',
  styleUrl: './snackbar.component.scss',
  template: `
    <div class="quanta-snackbar-content" role="status" aria-live="polite">
      {{ message() }}
    </div>
    @if (action()) {
      <div class="quanta-snackbar-action">
        <button (click)="actionClicked.emit()">{{ action() }}</button>
      </div>
    }
  `,
})
export class QuantaSnackbarComponent {
  /** Optional action button text. */
  action = input<string | undefined>(undefined);
  /** Emits when action button is clicked. */
  actionClicked = output<void>();
  /** Controls visibility animation state. */
  isOpen = input<boolean>(false);
  /** The message text to display. */
  message = input.required<string>();
}
