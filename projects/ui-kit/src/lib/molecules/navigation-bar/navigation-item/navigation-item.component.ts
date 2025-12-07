import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { QuantaIconComponent } from '../../../atoms/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '[class.active]': 'active()',
    class: 'quanta-navigation-item',
    // 'role': 'tab', // Or link, depending on usage. Typically navigation bar items are links or buttons.
    // Use button behavior for now? Or just div and let user wrap?
    // Material typically handles click. We can add hostbinding for click?
    // For now, let's just be presentational.
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
  label = input.required<string>();
}
