import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaNavigationRailItemComponent } from './navigation-rail-item.component';

describe('QuantaNavigationRailItemComponent', () => {
  let component: QuantaNavigationRailItemComponent;
  let fixture: ComponentFixture<QuantaNavigationRailItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaNavigationRailItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaNavigationRailItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('label', 'Home');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
