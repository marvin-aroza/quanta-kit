import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { QuantaInputComponent } from '../../atoms/input/input.component';
import { QuantaFormFieldComponent } from './form-field.component';

@Component({
  imports: [QuantaFormFieldComponent, QuantaInputComponent, ReactiveFormsModule],
  template: `
    <quanta-form-field [label]="label()" [errorMessage]="errorMessage()">
      <quanta-input [formControl]="control" label="Input Label"></quanta-input>
    </quanta-form-field>
  `,
})
class TestHostComponent {
  control = new FormControl('');
  errorMessage = signal('');
  label = signal('Test Label');
}

describe('QuantaFormFieldComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle missing control', () => {
    // Create a fixture with empty form field
    const emptyFixture = TestBed.createComponent(QuantaFormFieldComponent);
    emptyFixture.detectChanges();
    expect(emptyFixture.componentInstance).toBeTruthy();
    // This covers the branch where control is null in ngAfterContentInit
  });

  it('should render label', () => {
    const label = fixture.debugElement.query(By.css('.quanta-form-field__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('should project input control', () => {
    const input = fixture.debugElement.query(By.css('quanta-input'));
    expect(input).toBeTruthy();
  });

  it('should display error message when provided', async () => {
    component.errorMessage.set('Custom Error');
    fixture.detectChanges();
    await fixture.whenStable();

    const error = fixture.debugElement.query(By.css('.quanta-form-field__error'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent.trim()).toBe('Custom Error');
  });

  it('should display error message when control is invalid and touched', async () => {
    // Wait for ContentChild to be resolved
    fixture.detectChanges();
    await fixture.whenStable();

    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.quanta-form-field__error'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent.trim()).toBe('Invalid input');
  });

  it('should update view when control status changes', async () => {
    // Wait for ContentChild to be resolved
    fixture.detectChanges();
    await fixture.whenStable();

    const formField = fixture.debugElement.query(By.css('quanta-form-field')).componentInstance;
    const cdrSpy = vi.spyOn(formField._cdr, 'markForCheck');

    component.control.setErrors({ custom: true });
    fixture.detectChanges();

    expect(cdrSpy).toHaveBeenCalled();
  });
});
