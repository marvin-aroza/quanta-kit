import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaTopAppBarComponent } from './top-app-bar.component';

describe('QuantaTopAppBarComponent', () => {
  let component: QuantaTopAppBarComponent;
  let fixture: ComponentFixture<QuantaTopAppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaTopAppBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaTopAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
