import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { QuantaRadioButtonComponent } from './radio-button.component';
import { QuantaRadioGroupComponent } from './radio-group.component';

@Component({
  imports: [QuantaRadioGroupComponent, QuantaRadioButtonComponent, ReactiveFormsModule],

  template: `
    <quanta-radio-group [formControl]="control" [name]="name" [required]="required">
      <quanta-radio-button value="1" label="Option 1"></quanta-radio-button>
      <quanta-radio-button value="2" label="Option 2"></quanta-radio-button>
      <quanta-radio-button value="3" label="Option 3" [disabled]="true"></quanta-radio-button>
    </quanta-radio-group>
  `,
})
class TestHostComponent {
  control = new FormControl<null | string>(null);
  name = 'test-group';
  required = false;
}

describe('QuantaRadioGroupComponent', () => {
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

  it('should render radio buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('quanta-radio-button'));
    expect(buttons.length).toBe(3);
  });

  it('should select option on click', () => {
    const buttons = fixture.debugElement.queryAll(By.css('quanta-radio-button'));
    const option1 = buttons[0].nativeElement.querySelector('input');

    option1.click();
    fixture.detectChanges();

    expect(component.control.value).toBe('1');
    expect(buttons[0].componentInstance.checked()).toBe(true);
    expect(buttons[1].componentInstance.checked()).toBe(false);
  });

  it('should update selection when form control changes', () => {
    component.control.setValue('2');
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('quanta-radio-button'));
    expect(buttons[1].componentInstance.checked()).toBe(true);
    expect(buttons[0].componentInstance.checked()).toBe(false);
  });

  it('should not select disabled option', () => {
    const buttons = fixture.debugElement.queryAll(By.css('quanta-radio-button'));
    const option3 = buttons[2].nativeElement.querySelector('input');

    option3.click();
    fixture.detectChanges();

    expect(component.control.value).toBeNull();
    expect(buttons[2].componentInstance.checked()).toBe(false);
  });

  it('should disable all buttons when group is disabled', () => {
    component.control.disable();
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('quanta-radio-button'));
    expect(buttons[0].componentInstance.isDisabled()).toBe(true);
    expect(buttons[1].componentInstance.isDisabled()).toBe(true);
  });

  // it('should support required validation', fakeAsync(() => {
  //   console.log('Test: Setting required to true');
  //   component.required = true;
  //   fixture.detectChanges();
  //   tick(); // Process setTimeout

  //   console.log('Test: Checking validity', component.control.valid, component.control.errors);
  //   // Initial state is null, so invalid
  //   expect(component.control.valid).toBe(false);
  //   expect(component.control.hasError('required')).toBe(true);

  //   component.control.setValue('1');
  //   fixture.detectChanges();

  //   expect(component.control.valid).toBe(true);
  // }));
});
