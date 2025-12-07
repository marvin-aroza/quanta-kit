import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaNavigationDrawerComponent } from './navigation-drawer.component';

describe('QuantaNavigationDrawerComponent', () => {
  let component: QuantaNavigationDrawerComponent;
  let fixture: ComponentFixture<QuantaNavigationDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaNavigationDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaNavigationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
