import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
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

  it('should prioritize error over helper text', () => {
    fixture.componentRef.setInput('error', 'Error');
    fixture.componentRef.setInput('helperText', 'Helper');
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.error-text'));
    const helper = fixture.debugElement.query(By.css('.helper-text'));
    expect(error).toBeTruthy();
    expect(helper).toBeFalsy();
  });

  it('should display required marker', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const marker = fixture.debugElement.query(By.css('.required-marker'));
    expect(marker).toBeTruthy();
  });

  it('should display icon', () => {
    fixture.componentRef.setInput('icon', 'search');
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.input-icon'));
    expect(icon.nativeElement.textContent).toContain('search');
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

    it('should handle null value in writeValue', () => {
      component.writeValue(null as unknown as string);
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.value).toBe('');
    });
  });

  describe('Validator', () => {
    it('should return null if not required', () => {
      fixture.componentRef.setInput('required', false);
      const control = new FormControl('');
      expect(component.validate(control)).toBeNull();
    });

    it('should return error if required and empty', () => {
      fixture.componentRef.setInput('required', true);
      const control = new FormControl('');
      expect(component.validate(control)).toEqual({ required: true });
    });

    it('should return null if required and not empty', () => {
      fixture.componentRef.setInput('required', true);
      const control = new FormControl('test');
      expect(component.validate(control)).toBeNull();
    });
  });

  it('should have default values', () => {
    expect(component.type()).toBe('text');
    expect(component.placeholder()).toBe('');
    expect(component.required()).toBe(false);
    expect(component.disabled()).toBe(false);
  });

  it('should be disabled via input', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.disabled).toBe(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('should be disabled via FormControl', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.disabled).toBe(true);
    expect(component.isDisabled()).toBe(true);
  });

  it('should update value signal on input', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'new value';
    input.triggerEventHandler('input', { target: input.nativeElement });
    expect(component.value()).toBe('new value');
  });

  it('should handle undefined value in writeValue', () => {
    component.writeValue(undefined as unknown as string);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.value).toBe('');
    expect(component.value()).toBe('');
  });

  it('should be invalid when error is present', () => {
    fixture.componentRef.setInput('error', 'Error');
    fixture.detectChanges();
    expect(component.isInvalid()).toBe(true);
  });

  it('should be valid when error is null', () => {
    fixture.componentRef.setInput('error', null);
    fixture.detectChanges();
    expect(component.isInvalid()).toBe(false);
  });
});
