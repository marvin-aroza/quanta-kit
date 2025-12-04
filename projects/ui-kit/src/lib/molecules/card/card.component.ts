import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type CardVariant = 'elevated' | 'filled' | 'outlined';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'quanta-card',
  standalone: true,
  styleUrls: ['./card.component.scss'],
  template: `
    <div class="quanta-card" [class]="variant()">
      <!-- Header Slot -->
      <div class="card-header">
        <ng-content select="[header]"></ng-content>
      </div>

      <!-- Media Slot -->
      <div class="card-media">
        <ng-content select="[media]"></ng-content>
      </div>

      <!-- Main Content -->
      <div class="card-content">
        <ng-content></ng-content>
      </div>

      <!-- Actions Slot -->
      <div class="card-actions">
        <ng-content select="[actions]"></ng-content>
      </div>
    </div>
  `,
})
export class QuantaCardComponent {
  variant = input<CardVariant>('elevated');
}
