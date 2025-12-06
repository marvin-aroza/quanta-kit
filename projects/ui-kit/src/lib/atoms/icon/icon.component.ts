import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.inline]': 'inline()',
    class: 'quanta-icon',
  },
  imports: [CommonModule],
  selector: 'quanta-icon',
  styleUrl: './icon.component.scss',
  template: `
    @if (name()) {
      <span [class]="fontSet()">{{ name() }}</span>
    } @else {
      <ng-content></ng-content>
    }
  `,
})
export class QuantaIconComponent {
  /**
   * Font set class to apply. Defaults to 'material-icons'.
   * Could be changed to 'material-symbols-outlined' etc.
   */
  fontSet = input<string>('material-icons');

  /** Whether the icon should scale with text (not yet implemented fully in CSS, but placeholder) */
  inline = input<boolean>(false);

  /** Name of the icon in the font set (e.g., 'settings') */
  name = input<string>();
}
