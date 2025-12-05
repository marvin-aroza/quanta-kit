import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { QuantaCheckboxComponent } from './checkbox.component';

describe('QuantaCheckboxComponent', () => {
  let component: QuantaCheckboxComponent;
  let fixture: ComponentFixture<QuantaCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaCheckboxComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checked state on click', () => {
    let emittedValue: boolean | undefined;
    let formValue: boolean | undefined;

    component.changed.subscribe((value) => (emittedValue = value));
    component.registerOnChange((value) => (formValue = value));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.click();
    fixture.detectChanges();

    expect(component.checked()).toBe(true);
    expect(emittedValue).toBe(true);
    expect(formValue).toBe(true);
  });

  it('should prevent default event on toggle', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    const event = new Event('change');
    const spy = vi.spyOn(event, 'preventDefault');
    inputElement.triggerEventHandler('change', event);
    expect(spy).toHaveBeenCalled();
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.click();
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
  });

  it('should not toggle when disabled via setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.click();
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
    expect(component.isDisabled()).toBe(true);
  });

  it('should display label when provided', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('.label-text')).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should update checked state via writeValue', () => {
    component.writeValue(true);
    expect(component.checked()).toBe(true);

    component.writeValue(false);
    expect(component.checked()).toBe(false);
  });

  it('should return validation error when required and unchecked', () => {
    fixture.componentRef.setInput('required', true);
    const error = component.validate(null!);
    expect(error).toEqual({ required: true });

    component.writeValue(true);
    expect(component.validate(null!)).toBeNull();
  });

  it('should return null validation when not required', () => {
    fixture.componentRef.setInput('required', false);
    expect(component.validate(null!)).toBeNull();
  });

  it('should handle indeterminate state', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('.quanta-checkbox-container'));
    expect(checkbox.classes['indeterminate']).toBe(true);

    // Check if indeterminate icon is shown (if implemented in template)
    // Looking at template would confirm, but class check covers the binding branch

    // Verify aria-checked is mixed
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.attributes['aria-checked']).toBe('mixed');
  });

  it('should have correct aria-checked attribute', () => {
    const input = fixture.debugElement.query(By.css('input'));

    // Default unchecked
    expect(input.attributes['aria-checked']).toBe('false');

    // Checked
    component.checked.set(true);
    fixture.detectChanges();
    expect(input.attributes['aria-checked']).toBe('true');
  });

  it('should integrate with reactive forms', () => {
    const control = new FormControl(false);
    component.registerOnChange((value) => control.setValue(value));
    component.registerOnTouched(() => control.markAsTouched());

    // Simulating view to model change
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.click();
    fixture.detectChanges();

    expect(control.value).toBe(true);
    expect(control.touched).toBe(true);
  });

  it('should support aria-label', () => {
    fixture.componentRef.setInput('aria-label', 'Custom Label');
    fixture.detectChanges();
    expect(component.ariaLabel()).toBe('Custom Label');
  });

  it('should have default id', () => {
    expect(component.checkboxId).toMatch(/quanta-checkbox-\d+/);
  });

  it('should call onTouched on blur', () => {
    const spy = vi.fn();
    component.registerOnTouched(spy);
    component.onBlur();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle null/undefined in writeValue', () => {
    component.writeValue(null as unknown as boolean);
    expect(component.checked()).toBe(false);

    component.writeValue(undefined as unknown as boolean);
    expect(component.checked()).toBe(false);
  });
});
