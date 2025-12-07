import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { QuantaIconComponent } from '../../../atoms/icon/icon.component';

import { output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '(click)': 'itemClick.emit()',
    '(keydown.enter)': 'itemClick.emit()',
    '(keydown.space)': '$event.preventDefault(); itemClick.emit()',
    '[class.active]': 'active()',
    class: 'quanta-navigation-item',
    role: 'button',
    tabindex: '0',
  },
  imports: [CommonModule, QuantaIconComponent],
  selector: 'quanta-navigation-item',
  styleUrl: './navigation-item.component.scss',
  template: `
    <div class="quanta-navigation-item-icon-container" [class.active]="active()">
      <div class="quanta-navigation-item-active-indicator"></div>
      <quanta-icon [name]="icon()" class="quanta-navigation-item-icon"></quanta-icon>
    </div>
    <span class="quanta-navigation-item-label" [class.active]="active()">
      {{ label() }}
    </span>
  `,
})
export class QuantaNavigationItemComponent {
  active = input<boolean>(false);
  icon = input.required<string>();
  itemClick = output<void>();
  label = input.required<string>();
}
