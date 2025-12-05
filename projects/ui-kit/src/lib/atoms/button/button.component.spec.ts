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
});
