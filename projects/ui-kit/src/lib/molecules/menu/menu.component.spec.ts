import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaMenuItemComponent } from './menu-item.component';
import { QuantaMenuComponent } from './menu.component';

// Isolated logic tests are sufficient for this component's simple behavior.
// Integration tests involving document clicks and overlays are better suited for E2E tests.

describe('QuantaMenuComponent Logic', () => {
  let fixture: ComponentFixture<QuantaMenuComponent>;
  let component: QuantaMenuComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show surface when open is true', async () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    await fixture.whenStable();
    const surface = fixture.debugElement.query(By.css('.quanta-menu-surface'));
    expect(surface).toBeTruthy();
  });

  it('should update open model to false on outside click', async () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    await fixture.whenStable();

    document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    // Check if the signal has been updated to false
    expect(component.open()).toBe(false);
  });
});

describe('QuantaMenuItemComponent', () => {
  let fixture: ComponentFixture<QuantaMenuItemComponent>;
  let component: QuantaMenuItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menuitem role', () => {
    fixture.componentRef.setInput('headline', 'Test Item');
    fixture.detectChanges();
    // Role is now on the host element
    expect(fixture.debugElement.attributes['role']).toBe('menuitem');
  });

  it('should set aria-disabled and tabindex when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(fixture.debugElement.attributes['aria-disabled']).toBe('true');
    expect(fixture.debugElement.attributes['tabindex']).toBe('-1');

    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(fixture.debugElement.attributes['aria-disabled']).toBe('false');
    expect(fixture.debugElement.attributes['tabindex']).toBe('0');
  });
});
