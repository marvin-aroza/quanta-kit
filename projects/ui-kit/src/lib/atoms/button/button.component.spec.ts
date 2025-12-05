import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaButtonComponent } from './button.component';

describe('QuantaButtonComponent', () => {
  let component: QuantaButtonComponent;
  let fixture: ComponentFixture<QuantaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default classes', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList).toContain('filled'); // Default variant
    expect(button.nativeElement.classList).toContain('primary'); // Default color
    expect(button.nativeElement.getAttribute('type')).toBe('button'); // Default type
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList).toContain('filled');

    fixture.componentRef.setInput('variant', 'outlined');
    fixture.detectChanges();
    expect(button.nativeElement.classList).toContain('outlined');
  });

  it('should disable button when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should emit clicked event when clicked', () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit clicked event when disabled', () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply color class', () => {
    fixture.componentRef.setInput('color', 'error');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList).toContain('error');
  });

  it('should set button type', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.getAttribute('type')).toBe('submit');
  });
});

@Component({
  imports: [QuantaButtonComponent],
  template: `
    <quanta-button>
      <span icon-start class="start-icon">Start</span>
      Label
      <span icon-end class="end-icon">End</span>
    </quanta-button>
  `,
})
class TestHostComponent {}

describe('QuantaButtonComponent Content Projection', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project content into correct slots', () => {
    const button = fixture.debugElement.query(By.css('button'));
    const startIcon = button.query(By.css('.start-icon'));
    const endIcon = button.query(By.css('.end-icon'));
    const label = button.query(By.css('.label'));

    expect(startIcon).toBeTruthy();
    expect(endIcon).toBeTruthy();
    expect(label.nativeElement.textContent).toContain('Label');

    expect(button.nativeElement.contains(startIcon.nativeElement)).toBe(true);
    expect(button.nativeElement.contains(endIcon.nativeElement)).toBe(true);
  });
});
