import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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

    <aside
      class="quanta-navigation-drawer"
      [class.open]="opened()"
      [class.modal]="mode() === 'modal'"
      [class.standard]="mode() === 'standard'"
      [class.dismissible]="mode() === 'dismissible'"
    >
      <div class="quanta-navigation-drawer-content">
        <ng-content></ng-content>
      </div>
    </aside>
  `,
})
export class QuantaNavigationDrawerComponent {
  mode = input<NavigationDrawerMode>('standard');
  opened = input<boolean>(true);
  scrimClick = output<void>();
}
