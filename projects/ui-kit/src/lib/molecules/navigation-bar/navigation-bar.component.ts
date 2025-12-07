import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule],
  selector: 'quanta-navigation-bar',
  styleUrl: './navigation-bar.component.scss',
  template: `
    <nav class="quanta-navigation-bar">
      <ng-content></ng-content>
    </nav>
  `,
})
export class QuantaNavigationBarComponent {}
