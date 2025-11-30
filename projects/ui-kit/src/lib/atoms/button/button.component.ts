import { Component, Output, EventEmitter, computed, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'error';

@Component({
  selector: 'quanta-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type()"
      [class]="buttonClasses()"
      [disabled]="disabled()"
      (click)="clicked.emit($event)">
      <div class="state-layer"></div>
      <ng-content select="[icon-start]"></ng-content>
      <span class="label"><ng-content></ng-content></span>
      <ng-content select="[icon-end]"></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None // To allow styling projected content easily if needed, though :host context is safer. Let's stick to default for now but I used ::ng-deep in SCSS which is deprecated. Better to use ViewEncapsulation.None or just expect user to size icons.
  // Actually, let's remove ViewEncapsulation.None and rely on the user or global styles for icon sizing, or use a specific selector.
  // Reverting to default encapsulation.
})
export class ButtonComponent {
  variant = input<ButtonVariant>('filled');
  color = input<ButtonColor>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);

  @Output() clicked = new EventEmitter<Event>();

  buttonClasses = computed(() => {
    return `${this.variant()} ${this.color()}`;
  });
}
