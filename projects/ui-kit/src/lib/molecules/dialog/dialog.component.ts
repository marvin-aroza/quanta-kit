import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'quanta-dialog',
  styleUrl: './dialog.component.scss',
  template: `
    <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events -->
    <dialog
      #dialogElement
      class="quanta-dialog"
      [attr.aria-labelledby]="headline() ? headlineId : null"
      [attr.aria-label]="!headline() && ariaLabel() ? ariaLabel() : null"
      [attr.aria-modal]="true"
      (click)="handleBackdropClick($event)"
      (close)="handleClose()"
      tabindex="-1"
    >
      <div class="quanta-dialog-container">
        <!-- Header -->
        @if (headline() || icon()) {
          <div class="quanta-dialog-header">
            @if (icon()) {
              <span class="quanta-dialog-icon material-icons">{{ icon() }}</span>
            }
            @if (headline()) {
              <h2 [id]="headlineId" class="quanta-dialog-headline">{{ headline() }}</h2>
            }
          </div>
        }

        <!-- Content -->
        <div class="quanta-dialog-content">
          <ng-content></ng-content>
        </div>

        <!-- Actions -->
        <div class="quanta-dialog-actions">
          <ng-content select="[actions]"></ng-content>
        </div>
      </div>
    </dialog>
  `,
})
export class QuantaDialogComponent {
  private static nextId = 0;
  ariaLabel = input<string>();

  closeOnScrimClick = input<boolean>(true);
  // View Child
  dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialogElement');
  headline = input<string>();
  readonly headlineId = `quanta-dialog-headline-${QuantaDialogComponent.nextId++}`;
  icon = input<string>();

  // Inputs
  open = model<boolean>(false);

  constructor() {
    // Sync open state with native dialog
    effect(() => {
      const dialogRef = this.dialogElement();
      if (!dialogRef) return;
      const dialog = dialogRef.nativeElement;

      if (this.open()) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        if (dialog.open) {
          dialog.close();
        }
      }
    });
  }

  close() {
    this.open.set(false);
  }

  handleBackdropClick(event: MouseEvent) {
    if (!this.closeOnScrimClick()) return;

    // Check if click is on the backdrop (dialog element itself, not container)
    // The dialog element covers the viewport when modal, but its content box is centered.
    // Clicks outside the content box target the dialog element.
    const dialogRef = this.dialogElement();
    if (dialogRef && event.target === dialogRef.nativeElement) {
      this.close();
    }
  }

  handleClose() {
    // Native close event (e.g. Escape key)
    this.open.set(false);
  }
}
