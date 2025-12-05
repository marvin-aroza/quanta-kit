import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaInputComponent } from './input.component';

describe('QuantaInputComponent', () => {
  let component: QuantaInputComponent;
  let fixture: ComponentFixture<QuantaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaInputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.textContent).toContain('Test Label');
  });

  it('should display placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Enter text');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.placeholder).toBe('Enter text');
  });

  it('should display helper text', () => {
    fixture.componentRef.setInput('helperText', 'Helper');
    fixture.detectChanges();
    const helper = fixture.debugElement.query(By.css('.helper-text'));
    expect(helper.nativeElement.textContent).toContain('Helper');
  });

  it('should display error message', () => {
    fixture.componentRef.setInput('error', 'Error');
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.error-text'));
    expect(error.nativeElement.textContent).toContain('Error');
    const container = fixture.debugElement.query(By.css('.quanta-input-container'));
    expect(container.nativeElement.classList).toContain('error');
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('test value');
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.value).toBe('test value');
    });

    it('should call onChange when input changes', () => {
      const spy = vi.fn();
      component.registerOnChange(spy);
      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.value = 'new value';
      input.triggerEventHandler('input', { target: input.nativeElement });
      expect(spy).toHaveBeenCalledWith('new value');
    });

    it('should call onTouched when blurred', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      const input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('blur', {});
      expect(spy).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.disabled).toBe(true);
    });
  });
});
