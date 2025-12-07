import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaBottomAppBarComponent } from './bottom-app-bar.component';

describe('QuantaBottomAppBarComponent', () => {
  let component: QuantaBottomAppBarComponent;
  let fixture: ComponentFixture<QuantaBottomAppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaBottomAppBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaBottomAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
