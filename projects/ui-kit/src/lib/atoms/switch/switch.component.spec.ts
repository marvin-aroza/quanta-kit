import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaSwitchComponent } from './switch.component';

describe('QuantaSwitchComponent', () => {
  let component: QuantaSwitchComponent;
  let fixture: ComponentFixture<QuantaSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checked state on click', () => {
    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.nativeElement.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.nativeElement.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(false);
  });

  it('should show icons when showIcons is true', () => {
    fixture.componentRef.setInput('showIcons', true);
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.switch-icon'));
    expect(icon).toBeTruthy();
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue(true);
      fixture.detectChanges();
      expect(component.checked()).toBe(true);
    });

    it('should call onChange when clicked', () => {
      const spy = vi.fn();
      component.registerOnChange(spy);
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.nativeElement.click();
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should call onTouched when blurred', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      const inputEl = fixture.debugElement.query(By.css('input'));
      inputEl.triggerEventHandler('blur', {});
      expect(spy).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      const inputEl = fixture.debugElement.query(By.css('input'));
      expect(inputEl.nativeElement.disabled).toBe(true);
    });
  });
});
