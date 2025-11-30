import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaButtonComponent } from './button.component';

describe('QuantaButtonComponent', () => {
  let component: QuantaButtonComponent;
  let fixture: ComponentFixture<QuantaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
