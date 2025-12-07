import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaNavigationBarComponent } from './navigation-bar.component';

describe('QuantaNavigationBarComponent', () => {
  let component: QuantaNavigationBarComponent;
  let fixture: ComponentFixture<QuantaNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaNavigationBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
