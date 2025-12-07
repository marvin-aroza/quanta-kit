import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaNavigationRailComponent } from './navigation-rail.component';

describe('QuantaNavigationRailComponent', () => {
  let component: QuantaNavigationRailComponent;
  let fixture: ComponentFixture<QuantaNavigationRailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaNavigationRailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaNavigationRailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', 'Main rail');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
