import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaNavigationDrawerItemComponent } from './navigation-drawer-item.component';

describe('QuantaNavigationDrawerItemComponent', () => {
  let component: QuantaNavigationDrawerItemComponent;
  let fixture: ComponentFixture<QuantaNavigationDrawerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaNavigationDrawerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaNavigationDrawerItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('label', 'Home');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
