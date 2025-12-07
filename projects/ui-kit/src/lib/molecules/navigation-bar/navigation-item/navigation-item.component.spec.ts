import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaNavigationItemComponent } from './navigation-item.component';

describe('QuantaNavigationItemComponent', () => {
  let component: QuantaNavigationItemComponent;
  let fixture: ComponentFixture<QuantaNavigationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaNavigationItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaNavigationItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('label', 'Home');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
