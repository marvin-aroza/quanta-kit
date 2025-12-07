import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type TopAppBarVariant = 'center-aligned' | 'large' | 'medium' | 'small';

/**
 * Material 3 Top App Bar Component.
 *
 * @example
 * <quanta-top-app-bar variant="small">
 *   <ng-container ngProjectAs="[navigationIcon]">
 *     <quanta-icon-button icon="menu"></quanta-icon-button>
 *   </ng-container>
 *   <span ngProjectAs="[headline]">Title</span>
 *   <ng-container ngProjectAs="[actions]">
 *     <quanta-icon-button icon="search"></quanta-icon-button>
 *   </ng-container>
 * </quanta-top-app-bar>
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule],
  selector: 'quanta-top-app-bar',
  styleUrl: './top-app-bar.component.scss',
  template: `
    <header
      class="quanta-top-app-bar"
      [class.quanta-top-app-bar-center-aligned]="variant() === 'center-aligned'"
      [class.quanta-top-app-bar-medium]="variant() === 'medium'"
      [class.quanta-top-app-bar-large]="variant() === 'large'"
    >
      @if (variant() === 'medium' || variant() === 'large') {
        <div class="quanta-top-app-bar-content-row">
          <div class="quanta-top-app-bar-leading">
            <ng-content select="[navigationIcon]"></ng-content>
          </div>
          <div class="quanta-top-app-bar-actions">
            <ng-content select="[actions]"></ng-content>
          </div>
        </div>
        <div class="quanta-top-app-bar-headline">
          <ng-content select="[headline]"></ng-content>
        </div>
      } @else {
        <!-- Small & Center Aligned -->
        <div class="quanta-top-app-bar-leading">
          <ng-content select="[navigationIcon]"></ng-content>
        </div>
        <div class="quanta-top-app-bar-headline">
          <ng-content select="[headline]"></ng-content>
        </div>
        <div class="quanta-top-app-bar-actions">
          <ng-content select="[actions]"></ng-content>
        </div>
      }
    </header>
  `,
})
export class QuantaTopAppBarComponent {
  /**
   * The visual variant of the app bar.
   * - `small`: Standard single-row app bar (Default).
   * - `center-aligned`: Title is centered.
   * - `medium`: Two rows, larger title.
   * - `large`: Taller, largest title.
   */
  variant = input<TopAppBarVariant>('small');
}
