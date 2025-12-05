import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaSelectComponent } from './select.component';

describe('QuantaSelectComponent', () => {
  let component: QuantaSelectComponent;
  let fixture: ComponentFixture<QuantaSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('.select-label'));
    expect(labelEl.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('should display options', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    // +1 for placeholder if present, but here we didn't set placeholder yet
    expect(options.length).toBe(2);
    expect(options[0].nativeElement.textContent.trim()).toBe('Option 1');
  });

  it('should display placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Select...');
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(3); // Placeholder + 2 options
    expect(options[0].nativeElement.textContent.trim()).toBe('Select...');
    expect(options[0].nativeElement.disabled).toBe(true);
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('2');
      fixture.detectChanges();
      const selectEl = fixture.debugElement.query(By.css('select'));
      expect(selectEl.nativeElement.value).toBe('2');
    });

    it('should call onChange when selection changes', () => {
      const spy = vi.fn();
      component.registerOnChange(spy);
      const selectEl = fixture.debugElement.query(By.css('select'));
      selectEl.nativeElement.value = '2';
      selectEl.triggerEventHandler('change', { target: selectEl.nativeElement });
      expect(spy).toHaveBeenCalledWith('2');
    });

    it('should call onTouched when blurred', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      const selectEl = fixture.debugElement.query(By.css('select'));
      selectEl.triggerEventHandler('blur', {});
      expect(spy).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      const container = fixture.nativeElement.querySelector('.quanta-select-container');
      expect(container.classList).toContain('disabled');
      const selectEl = fixture.debugElement.query(By.css('select'));
      expect(selectEl.nativeElement.disabled).toBe(true);
    });
  });

  it('should display error message', () => {
    fixture.componentRef.setInput('errorMessage', 'Error!');
    fixture.detectChanges();
    const errorEl = fixture.debugElement.query(By.css('.error-message'));
    expect(errorEl.nativeElement.textContent).toBe('Error!');
    expect(fixture.nativeElement.querySelector('.quanta-select-container').classList).toContain(
      'has-error',
    );
    const selectEl = fixture.debugElement.query(By.css('select'));
    expect(selectEl.nativeElement.getAttribute('aria-describedby')).toContain('-description');
  });

  it('should display helper text', () => {
    fixture.componentRef.setInput('helperText', 'Helper info');
    fixture.detectChanges();
    const helperEl = fixture.debugElement.query(By.css('.helper-text'));
    expect(helperEl.nativeElement.textContent).toBe('Helper info');
    const selectEl = fixture.debugElement.query(By.css('select'));
    expect(selectEl.nativeElement.getAttribute('aria-describedby')).toContain('-description');
  });

  it('should prioritize error message over helper text', () => {
    fixture.componentRef.setInput('errorMessage', 'Error!');
    fixture.componentRef.setInput('helperText', 'Helper info');
    fixture.detectChanges();
    const errorEl = fixture.debugElement.query(By.css('.error-message'));
    const helperEl = fixture.debugElement.query(By.css('.helper-text'));
    expect(errorEl).toBeTruthy();
    expect(helperEl).toBeFalsy();
  });

  it('should be disabled via input', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const selectEl = fixture.debugElement.query(By.css('select'));
    expect(selectEl.nativeElement.disabled).toBe(true);
  });

  it('should have default id', () => {
    expect(component.id()).toMatch(/quanta-select-.*/);
  });

  it('should support custom id', () => {
    fixture.componentRef.setInput('id', 'custom-select-id');
    fixture.detectChanges();
    const selectEl = fixture.debugElement.query(By.css('select'));
    expect(selectEl.nativeElement.getAttribute('id')).toBe('custom-select-id');
  });

  it('should handle null/undefined in writeValue', () => {
    component.writeValue(null);
    expect(component['value']()).toBe('');

    component.writeValue(undefined);
    expect(component['value']()).toBe('');
  });
});
