import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChildren,
  effect,
  ElementRef,
  input,
  model,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { QuantaTabComponent } from './tab.component';

export type TabVariant = 'primary' | 'secondary';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'quanta-tabs',
  styleUrl: './tabs.component.scss',
  template: `
    <div [class]="classes()">
      <div class="quanta-tab-header" role="tablist">
        @for (tab of tabs; track $index) {
          <button
            #tabBtn
            class="quanta-tab-label"
            [class.active]="selectedIndex() === $index"
            [disabled]="tab.disabled()"
            (click)="selectTab($index)"
            (keydown)="handleKeyDown($event, $index)"
            role="tab"
            [attr.aria-selected]="selectedIndex() === $index"
            [attr.aria-disabled]="tab.disabled()"
            [attr.aria-controls]="tab.panelId"
            [attr.tabindex]="selectedIndex() === $index ? 0 : -1"
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
  @ViewChildren('tabBtn') tabButtons!: QueryList<ElementRef>;
  @ContentChildren(QuantaTabComponent) tabs!: QueryList<QuantaTabComponent>;
  variant = input<TabVariant>('primary');

  protected classes = computed(() => `quanta-tab-group ${this.variant()}`);

  // Keep child tab panels in sync with the selectedIndex model
  private readonly syncSelectedIndexEffect = effect(() => {
    // Track changes from internal interactions and external bindings
    this.selectedIndex();

    if (!this.tabs || this.tabs.length === 0) {
      return;
    }

    this.updateActiveState();
  });

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

  handleKeyDown(event: KeyboardEvent, index: number) {
    let nextIndex = index;
    let direction: -1 | 1 = 1;
    switch (event.key) {
      case 'ArrowLeft':
        nextIndex = index - 1;
        direction = -1;
        break;
      case 'ArrowRight':
        nextIndex = index + 1;
        break;
      case 'End':
        nextIndex = this.tabs.length - 1;
        direction = -1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      default:
        return;
    }

    // Handle wrapping or clamping
    if (nextIndex < 0) nextIndex = this.tabs.length - 1;
    if (nextIndex >= this.tabs.length) nextIndex = 0;

    this.activateTabAndFocus(nextIndex, direction);
    event.preventDefault();
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
  }

  private activateTabAndFocus(index: number, direction: -1 | 1) {
    const tabs = this.tabs.toArray();

    // Simple loop to find next enabled tab
    let i = index;
    let attempts = 0;
    while (attempts < tabs.length) {
      if (!tabs[i].disabled()) {
        this.selectTab(i);
        this.focusTab(i);
        return;
      }
      i += direction;
      if (i < 0) i = tabs.length - 1;
      if (i >= tabs.length) i = 0;
      attempts++;
    }
  }

  private focusTab(index: number) {
    const btn = this.tabButtons?.get(index);
    btn?.nativeElement.focus();
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
