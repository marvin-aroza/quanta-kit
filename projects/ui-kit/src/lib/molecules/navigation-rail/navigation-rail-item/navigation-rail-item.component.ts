import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { QuantaIconComponent } from '../../../atoms/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '(click)': 'itemClick.emit()',
    '(keydown.enter)': 'itemClick.emit()',
    '(keydown.space)': '$event.preventDefault(); itemClick.emit()',
    '[class.active]': 'active()',
    class: 'quanta-navigation-rail-item',
    role: 'button',
    tabindex: '0',
  },
  imports: [CommonModule, QuantaIconComponent],
  selector: 'quanta-navigation-rail-item',
  styleUrl: './navigation-rail-item.component.scss',
  template: `
    <div class="quanta-nav-rail-item-content" [class.active]="active()">
      <div class="quanta-nav-rail-item-indicator"></div>
      <quanta-icon [name]="icon()" class="quanta-nav-rail-item-icon"></quanta-icon>
      <span class="quanta-nav-rail-item-label">{{ label() }}</span>
      <div class="quanta-nav-rail-item-badge">
        <ng-content select="[badge]"></ng-content>
      </div>
    </div>
  `,
})
export class QuantaNavigationRailItemComponent {
  active = input<boolean>(false);
  icon = input.required<string>();
  itemClick = output<void>();
  label = input.required<string>();
}
