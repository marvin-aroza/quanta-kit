import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.click();
    fixture.detectChanges();
    expect(component.checked()).toBeTrue();
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.click();
    fixture.detectChanges();

    expect(component.checked()).toBeFalse();
  });

  it('should display label when provided', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('.label-text')).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });
});
