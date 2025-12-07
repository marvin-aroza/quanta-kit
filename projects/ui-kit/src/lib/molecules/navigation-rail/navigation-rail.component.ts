import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[attr.aria-label]': 'ariaLabel()',
    role: 'navigation',
  },
  imports: [CommonModule],
  selector: 'quanta-navigation-rail',
  styleUrl: './navigation-rail.component.scss',
  template: `
    <div class="quanta-navigation-rail-header">
      <ng-content select="[header]"></ng-content>
    </div>
    <div class="quanta-navigation-rail-content">
      <ng-content></ng-content>
    </div>
  `,
})
export class QuantaNavigationRailComponent {
  ariaLabel = input.required<string>();
}
