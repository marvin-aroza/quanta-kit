import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaTabComponent } from './tab.component';
import { QuantaTabsComponent } from './tabs.component';

@Component({
  imports: [QuantaTabsComponent, QuantaTabComponent],
  template: `
    <quanta-tabs>
      <quanta-tab label="Tab 1">Content 1</quanta-tab>
      <quanta-tab label="Tab 2" [disabled]="true">Content 2</quanta-tab>
      <quanta-tab label="Tab 3">Content 3</quanta-tab>
    </quanta-tabs>
  `,
})
class TestHostComponent {}

describe('QuantaTabsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let tabsComponent: QuantaTabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, QuantaTabsComponent, QuantaTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges(); // Initial data binding + ngAfterContentInit

    // Find the tabs component instance
    const tabsEl = fixture.debugElement.query(By.directive(QuantaTabsComponent));
    tabsComponent = tabsEl.componentInstance;
  });

  it('should create', () => {
    expect(tabsComponent).toBeTruthy();
  });

  it('should perform initial selection (index 0)', () => {
    expect(tabsComponent.selectedIndex()).toBe(0);
    const activeTab = fixture.debugElement.query(By.css('.quanta-tab-label.active'));
    expect(activeTab.nativeElement.textContent).toContain('Tab 1');
  });

  it('should switch tab on click', () => {
    const tabLabels = fixture.debugElement.queryAll(By.css('.quanta-tab-label'));
    tabLabels[2].nativeElement.click(); // Click Tab 3
    fixture.detectChanges();

    expect(tabsComponent.selectedIndex()).toBe(2);
    const activeTab = fixture.debugElement.query(By.css('.quanta-tab-label.active'));
    expect(activeTab.nativeElement.textContent).toContain('Tab 3');
  });

  it('should not switch to disabled tab', () => {
    const tabLabels = fixture.debugElement.queryAll(By.css('.quanta-tab-label'));
    tabLabels[1].nativeElement.click(); // Click Tab 2 (Disabled)
    fixture.detectChanges();

    expect(tabsComponent.selectedIndex()).toBe(0); // Should stay at 0
  });

  it('should project content of active tab', () => {
    // Check body content visibility
    const panels = fixture.debugElement.queryAll(By.css('.quanta-tab-panel'));

    // Panel 1 (Index 0) should be visible (hidden=false)
    expect(panels[0].properties['hidden']).toBe(false);
    expect(panels[0].nativeElement.textContent).toContain('Content 1');

    // Panel 3 (Index 2) should be hidden (hidden=true)
    expect(panels[2].properties['hidden']).toBe(true);
    expect(panels[2].nativeElement.textContent).toContain('Content 3'); // content exists but is hidden

    // Switch to Tab 3
    tabsComponent.selectTab(2);
    fixture.detectChanges();

    // Recheck
    expect(panels[0].properties['hidden']).toBe(true);
    expect(panels[2].properties['hidden']).toBe(false);
  });
});
