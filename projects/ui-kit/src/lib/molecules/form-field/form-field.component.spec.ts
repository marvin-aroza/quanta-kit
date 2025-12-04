import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { QuantaInputComponent } from '../../atoms/input/input.component';
import { QuantaFormFieldComponent } from './form-field.component';

describe('QuantaFormFieldComponent', () => {
  let component: QuantaFormFieldComponent;
  let fixture: ComponentFixture<QuantaFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaFormFieldComponent, QuantaInputComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaFormFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Label');
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
    fixture.componentRef.setInput('label', 'Updated Label');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.quanta-form-field__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Updated Label');
  });

  it('should display error message when provided', () => {
    fixture.componentRef.setInput('errorMessage', 'Custom Error');
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.quanta-form-field__error'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent.trim()).toBe('Custom Error');
  });

  // For content projection tests, we still need a host or we need to project content manually.
  // Since QuantaFormFieldComponent expects a control content child, testing it directly is hard if we want to test the control interaction.
  // We can mock the ContentChild or use a wrapper for just that test.
});
