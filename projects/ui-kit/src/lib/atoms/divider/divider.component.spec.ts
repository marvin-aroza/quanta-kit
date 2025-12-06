import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantaDividerComponent } from './divider.component';

describe('QuantaDividerComponent', () => {
  let component: QuantaDividerComponent;
  let fixture: ComponentFixture<QuantaDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have horizontal class by default', () => {
    const divider = fixture.debugElement.nativeElement;
    expect(divider.classList.contains('quanta-divider-horizontal')).toBe(true);
    expect(divider.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should have vertical class when vertical is true', () => {
    fixture.componentRef.setInput('vertical', true);
    fixture.detectChanges();
    const divider = fixture.debugElement.nativeElement;
    expect(divider.classList.contains('quanta-divider-vertical')).toBe(true);
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should have inset class when inset is set', () => {
    fixture.componentRef.setInput('inset', 'start');
    fixture.detectChanges();
    const divider = fixture.debugElement.nativeElement;
    expect(divider.classList.contains('quanta-divider-inset-start')).toBe(true);
  });
});
