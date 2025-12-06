import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'quanta-tab',
  styles: [
    `
      :host {
        display: contents; /* Wrapper should not interfere with query list or layout */
      }
      .quanta-tab-panel {
        display: block;

        &[hidden] {
          display: none;
        }
      }
    `,
  ],
  template: `
    <div
      [hidden]="!active()"
      class="quanta-tab-panel"
      role="tabpanel"
      [id]="panelId"
      [attr.aria-labelledby]="ariaLabelledBy()"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class QuantaTabComponent {
  // Controlled by parent
  active = model<boolean>(false);
  // Internal/Parent-controlled IDs
  ariaLabelledBy = model<string | undefined>(undefined);
  disabled = input<boolean>(false);
  icon = input<string>();
  label = input.required<string>();

  panelId = `quanta-tab-panel-${Math.random().toString(36).substr(2, 9)}`;
}
