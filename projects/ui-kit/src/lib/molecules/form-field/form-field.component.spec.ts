import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { QuantaInputComponent } from '../../atoms/input/input.component';
import { QuantaFormFieldComponent } from './form-field.component';

@Component({
  imports: [QuantaFormFieldComponent, QuantaInputComponent, ReactiveFormsModule],
  standalone: true,
  template: `
    <div class="host-label">{{ label }}</div>
    <div class="host-error">{{ hostErrorMessage }}</div>
    <quanta-form-field [label]="label" [errorMessage]="hostErrorMessage">
      <quanta-input [formControl]="control" label="Input Label"></quanta-input>
    </quanta-form-field>
  `,
})
class TestHostComponent {
  control = new FormControl('');
  hostErrorMessage = '';
  label = 'Test Label';
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

  it('should render label', () => {
    const label = fixture.debugElement.query(By.css('.quanta-form-field__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('should update label', () => {
    console.log('Test: Updating label');
    component.label = 'Updated Label';
    fixture.detectChanges();

    const hostLabel = fixture.debugElement.query(By.css('.host-label'));
    console.log('Test: Host label text', hostLabel.nativeElement.textContent.trim());
    expect(hostLabel.nativeElement.textContent.trim()).toBe('Updated Label');

    const formFieldDebugEl = fixture.debugElement.query(By.directive(QuantaFormFieldComponent));
    const cdr = formFieldDebugEl.injector.get(ChangeDetectorRef);
    cdr.detectChanges();

    const label = fixture.debugElement.query(By.css('.quanta-form-field__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Updated Label');
  });

  it('should display error message when provided', () => {
    console.log('Test: Updating errorMessage');
    component.hostErrorMessage = 'Custom Error';
    fixture.detectChanges();

    const hostError = fixture.debugElement.query(By.css('.host-error'));
    console.log('Test: Host error text', hostError.nativeElement.textContent.trim());
    expect(hostError.nativeElement.textContent.trim()).toBe('Custom Error');

    const formFieldDebugEl = fixture.debugElement.query(By.directive(QuantaFormFieldComponent));
    const formFieldInstance = formFieldDebugEl.componentInstance as QuantaFormFieldComponent;

    // Manual CD
    const cdr = formFieldDebugEl.injector.get(ChangeDetectorRef);
    cdr.detectChanges();

    console.log('Test: Property value', formFieldInstance.errorMessage);

    const error = fixture.debugElement.query(By.css('.quanta-form-field__error'));
    console.log('Test: Error element', error);
    if (error) {
      console.log('Test: Error text', error.nativeElement.textContent.trim());
    }
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent.trim()).toBe('Custom Error');
  });

  it('should display error when control is invalid and touched', () => {
    component.control.setValidators([Validators.required]);
    component.control.markAsTouched();
    component.control.updateValueAndValidity();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.quanta-form-field__error'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent.trim()).toBe('Invalid input');
  });

  it('should display error message when provided initially', async () => {
    component.hostErrorMessage = 'Initial Error';
    fixture.detectChanges();
    await fixture.whenStable();

    const formFieldDebugEl = fixture.debugElement.query(By.directive(QuantaFormFieldComponent));
    const cdr = formFieldDebugEl.injector.get(ChangeDetectorRef);
    cdr.detectChanges();

    const error = fixture.debugElement.query(By.css('.quanta-form-field__error'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent.trim()).toBe('Initial Error');
  });
});
