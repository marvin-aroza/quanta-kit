import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

export type NavigationDrawerMode = 'dismissible' | 'modal' | 'standard';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[class.drawer-modal]': 'mode() === "modal"',
    '[class.drawer-open]': 'opened()',
  },
  imports: [CommonModule],
  selector: 'quanta-navigation-drawer',
  styleUrl: './navigation-drawer.component.scss',
  template: `
    @if (opened() && mode() === 'modal') {
      <div
        class="quanta-navigation-drawer-scrim"
        (click)="scrimClick.emit()"
        (keydown.enter)="scrimClick.emit()"
        (keydown.space)="$event.preventDefault(); scrimClick.emit()"
        role="button"
        tabindex="0"
        aria-label="Close navigation drawer"
      ></div>
    }

    <!-- Modal Drawer with Focus Trap -->
    @if (mode() === 'modal') {
      <div
        class="quanta-navigation-drawer modal"
        [class.open]="opened()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="ariaLabel()"
        (keydown)="handleKeyDown($event)"
        tabindex="-1"
        #modalDrawer
      >
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </div>
    } @else {
      <!-- Standard/Dismissible Drawer (No Trap) -->
      <div
        class="quanta-navigation-drawer"
        [class.open]="opened()"
        [class.standard]="mode() === 'standard'"
        [class.dismissible]="mode() === 'dismissible'"
        role="navigation"
        [attr.aria-label]="ariaLabel()"
      >
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </div>
    }

    <ng-template #contentTemplate>
      <div class="quanta-navigation-drawer-content">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
})
export class QuantaNavigationDrawerComponent {
  ariaLabel = input<string>();
  effectRef = effect(() => {
    if (this.opened() && this.mode() === 'modal') {
      // Focus the drawer when opened in modal mode
      setTimeout(() => {
        const drawer = document.querySelector('.quanta-navigation-drawer.modal') as HTMLElement;
        drawer?.focus();
      });
    }
  });
  mode = input<NavigationDrawerMode>('standard');
  opened = input<boolean>(true);

  scrimClick = output<void>();

  handleKeyDown(event: KeyboardEvent) {
    if (this.mode() !== 'modal') return;

    if (event.key === 'Escape') {
      this.scrimClick.emit();
      event.stopPropagation();
      return;
    }

    if (event.key === 'Tab') {
      const drawer = event.currentTarget as HTMLElement;
      const focusableElements = drawer.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === first || document.activeElement === drawer) {
          last?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first?.focus();
          event.preventDefault();
        }
      }
    }
  }
}
