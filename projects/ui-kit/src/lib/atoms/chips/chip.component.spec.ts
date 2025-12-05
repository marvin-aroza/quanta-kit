import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaChipComponent } from './chip.component';

describe('QuantaChipComponent', () => {
  let component: QuantaChipComponent;
  let fixture: ComponentFixture<QuantaChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaChipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Chip');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.debugElement.query(By.css('.chip-label')).nativeElement;
    expect(label.textContent).toContain('Test Chip');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'filter');
    fixture.detectChanges();
    const chip = fixture.debugElement.query(By.css('.quanta-chip'));
    expect(chip.nativeElement.classList).toContain('filter');
  });

  it('should toggle selection for filter variant', () => {
    fixture.componentRef.setInput('variant', 'filter');
    fixture.detectChanges();

    const chip = fixture.debugElement.query(By.css('.quanta-chip'));
    chip.nativeElement.click();
    fixture.detectChanges();

    expect(component.selected()).toBe(true);
    expect(chip.nativeElement.classList).toContain('selected');
    expect(chip.attributes['aria-pressed']).toBe('true');
  });

  it('should not toggle selection for assist variant', () => {
    fixture.componentRef.setInput('variant', 'assist');
    fixture.detectChanges();

    const chip = fixture.debugElement.query(By.css('.quanta-chip'));
    chip.nativeElement.click();
    fixture.detectChanges();

    expect(component.selected()).toBe(false);
  });

  it('should emit removed event for input chip', () => {
    fixture.componentRef.setInput('variant', 'input');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    const spy = vi.fn();
    component.removed.subscribe(spy);

    const removeIcon = fixture.debugElement.query(By.css('.remove-icon'));
    expect(removeIcon).toBeTruthy();

    removeIcon.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit events when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('variant', 'filter');
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();

    // Using effect to track signal changes for spy is hard in test, checking state directly
    const removeSpy = vi.fn();
    component.removed.subscribe(removeSpy);

    const chip = fixture.debugElement.query(By.css('.quanta-chip'));
    chip.nativeElement.click();
    fixture.detectChanges();
    expect(component.selected()).toBe(false);

    // If removable, try clicking remove icon (it might be hidden or disabled via pointer-events in CSS,
    // but logic check is good too)
    // In template: (click)="remove($event)" checks disabled()
    const removeIcon = fixture.debugElement.query(By.css('.remove-icon'));
    if (removeIcon) {
      removeIcon.nativeElement.click();
    }
    expect(removeSpy).not.toHaveBeenCalled();
  });
});
