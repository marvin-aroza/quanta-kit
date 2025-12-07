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
    class: 'quanta-navigation-drawer-item',
    role: 'button',
    tabindex: '0',
  },
  imports: [CommonModule, QuantaIconComponent],
  selector: 'quanta-navigation-drawer-item',
  styleUrl: './navigation-drawer-item.component.scss',
  template: `
    <div class="quanta-nav-drawer-item-content" [class.active]="active()">
      <div class="quanta-nav-drawer-item-indicator"></div>
      <quanta-icon [name]="icon()" class="quanta-nav-drawer-item-icon"></quanta-icon>
      <span class="quanta-nav-drawer-item-label">{{ label() }}</span>
      <div class="quanta-nav-drawer-item-badge">
        <ng-content select="[badge]"></ng-content>
      </div>
    </div>
  `,
})
export class QuantaNavigationDrawerItemComponent {
  active = input<boolean>(false);
  icon = input.required<string>();
  itemClick = output<void>();
  label = input.required<string>();
}
