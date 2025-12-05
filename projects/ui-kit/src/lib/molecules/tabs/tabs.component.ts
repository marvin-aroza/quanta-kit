import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  input,
  model,
  Output,
  QueryList,
} from '@angular/core';
import { QuantaTabComponent } from './tab.component';

export type TabVariant = 'primary' | 'secondary';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'quanta-tabs',
  standalone: true,
  styleUrl: './tabs.component.scss',
  template: `
    <div class="quanta-tab-group" [class]="variant()">
      <div class="quanta-tab-header" role="tablist">
        @for (tab of tabs; track $index) {
          <button
            class="quanta-tab-label"
            [class.active]="selectedIndex() === $index"
            [disabled]="tab.disabled()"
            (click)="selectTab($index)"
            role="tab"
            [attr.aria-selected]="selectedIndex() === $index"
            [attr.aria-disabled]="tab.disabled()"
            [attr.aria-controls]="tab.panelId"
            [id]="getTabId($index)"
            type="button"
          >
            @if (tab.icon()) {
              <span class="quanta-tab-icon material-icons">{{ tab.icon() }}</span>
            }
            <span class="quanta-tab-text-label">{{ tab.label() }}</span>

            <!-- Active Indicator (Primary/Secondary specifics handled in CSS) -->
            @if (selectedIndex() === $index) {
              <span class="quanta-active-indicator"></span>
            }
          </button>
        }
      </div>

      <div class="quanta-tab-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class QuantaTabsComponent implements AfterContentInit {
  autoSelect = input<boolean>(true);
  selectedIndex = model<number>(0);
  @Output() selectedIndexChange = new EventEmitter<number>();
  @ContentChildren(QuantaTabComponent) tabs!: QueryList<QuantaTabComponent>;

  variant = input<TabVariant>('primary');

  private uniqueId = `quanta-tabs-${Math.random().toString(36).substr(2, 9)}`;

  constructor() {
    // We'll use a signal effect if we want to react to everything,
    // but ContentChildren is only available after content init.
    // Also, mutating children signals in an effect might cause ExpressionChanged errs if not careful.
    // Let's use standard reactive pattern with `update()` in setter/methods.
  }

  getTabId(index: number): string {
    return `${this.uniqueId}-tab-${index}`;
  }

  ngAfterContentInit() {
    // Initial selection
    this.updateActiveState();

    // Listen for tab changes (dynamic add/remove)
    this.tabs.changes.subscribe(() => {
      // If index out of bounds, reset?
      if (this.selectedIndex() >= this.tabs.length) {
        this.selectTab(0);
      } else {
        this.updateActiveState();
      }
    });
  }

  selectTab(index: number) {
    if (index < 0 || index >= this.tabs.length) return;
    const tab = this.tabs.get(index);
    if (!tab || tab.disabled()) return;

    this.selectedIndex.set(index);
    this.selectedIndexChange.emit(index);
    this.updateActiveState();
  }

  private updateActiveState() {
    // We need to run inside next generic cycle or ensure we don't cause loops.
    // Since tab.active is a signal model, setting it is fine.
    this.tabs.forEach((tab, i) => {
      tab.active.set(i === this.selectedIndex());
      // Update a11y link
      tab.ariaLabelledBy.set(this.getTabId(i));
    });
  }
}
