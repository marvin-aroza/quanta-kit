import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    // Set required input
    fixture.componentRef.setInput('label', 'Test Label');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
