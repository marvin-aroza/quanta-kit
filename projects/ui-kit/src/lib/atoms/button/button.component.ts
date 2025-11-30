import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, input, Output, ViewEncapsulation } from '@angular/core';

export type ButtonColor = 'error' | 'primary' | 'secondary' | 'tertiary';
export type ButtonVariant = 'elevated' | 'filled' | 'outlined' | 'text' | 'tonal';

@Component({
  // Disable encapsulation to allow styling of projected content (icons) without ::ng-deep.
  // Styles are manually scoped to the .quanta-button class to prevent bleeding.
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  selector: 'quanta-button',
  styleUrls: ['./button.component.scss'],
  template: `
    <button
      [type]="type()"
      [class]="buttonClasses()"
      [disabled]="disabled()"
      (click)="clicked.emit($event)"
    >
      <div class="state-layer"></div>
      <ng-content select="[icon-start]"></ng-content>
      <span class="label"><ng-content></ng-content></span>
      <ng-content select="[icon-end]"></ng-content>
    </button>
  `,
})
export class QuantaButtonComponent {
  color = input<ButtonColor>('primary');
  variant = input<ButtonVariant>('filled');
  buttonClasses = computed(() => {
    return `quanta-button ${this.variant()} ${this.color()}`;
  });
  @Output() clicked = new EventEmitter<Event>();

  disabled = input<boolean>(false);

  type = input<'button' | 'reset' | 'submit'>('button');
}
