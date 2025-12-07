import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Material 3 Bottom App Bar Component.
 * Provides access to a bottom navigation drawer and up to four actions, including the floating action button (FAB).
 *
 * @example
 * <quanta-bottom-app-bar>
 *   <ng-container ngProjectAs="[navigation-icon]">
 *     <quanta-icon-button icon="menu"></quanta-icon-button>
 *   </ng-container>
 *   <ng-container ngProjectAs="[actions]">
 *     <quanta-icon-button icon="search"></quanta-icon-button>
 *     <quanta-icon-button icon="favorite"></quanta-icon-button>
 *   </ng-container>
 *   <ng-container ngProjectAs="[fab]">
 *     <quanta-button icon="add">Add</quanta-button>
 *   </ng-container>
 * </quanta-bottom-app-bar>
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule],
  selector: 'quanta-bottom-app-bar',
  styleUrl: './bottom-app-bar.component.scss',
  template: `
    <header class="quanta-bottom-app-bar">
      <div class="quanta-bottom-app-bar-nav">
        <ng-content select="[navigation-icon]"></ng-content>
      </div>

      <div class="quanta-bottom-app-bar-actions">
        <ng-content select="[actions]"></ng-content>
      </div>

      <div class="quanta-bottom-app-bar-fab">
        <ng-content select="[fab]"></ng-content>
      </div>
    </header>
  `,
})
export class QuantaBottomAppBarComponent {}
