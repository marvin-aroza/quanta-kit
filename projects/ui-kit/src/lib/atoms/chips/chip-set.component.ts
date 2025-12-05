import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'quanta-chip-set',
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        box-sizing: border-box;
      }
    `,
  ],
  template: `<ng-content></ng-content>`,
})
export class QuantaChipSetComponent {
  singleSelection = input<boolean>(false);
}
