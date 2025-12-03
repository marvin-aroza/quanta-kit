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
});
