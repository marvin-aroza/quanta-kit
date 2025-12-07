import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaBadgeComponent } from './badge.component';

describe('QuantaBadgeComponent', () => {
  let component: QuantaBadgeComponent;
  let fixture: ComponentFixture<QuantaBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display count if provided', () => {
    fixture.componentRef.setInput('count', 5);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent?.trim()).toBe('5');
    expect(element.classList.contains('large')).toBeTrue();
  });

  it('should show + if over maxCount', () => {
    fixture.componentRef.setInput('count', 100);
    fixture.componentRef.setInput('maxCount', 99);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent?.trim()).toBe('99+');
  });

  it('should be small/dot if dot input is true', () => {
    fixture.componentRef.setInput('dot', true);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.classList.contains('small')).toBeTrue();
    expect(element.textContent?.trim()).toBe('');
  });
});
