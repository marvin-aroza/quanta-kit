import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaCircularProgressComponent } from './circular-progress.component';

describe('QuantaCircularProgressComponent', () => {
  let component: QuantaCircularProgressComponent;
  let fixture: ComponentFixture<QuantaCircularProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaCircularProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaCircularProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have progressbar role', () => {
    const host = fixture.nativeElement;
    expect(host.getAttribute('role')).toBe('progressbar');
  });

  it('should reflect indeterminate state', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    const host = fixture.nativeElement;
    // Indeterminate class is added
    expect(host.classList.contains('quanta-circular-progress-indeterminate')).toBe(true);
  });

  it('should reflect determinate value', () => {
    fixture.componentRef.setInput('value', 25);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();

    // Check stroke-dashoffset
    // Circumference ~ 125.66
    // 25% progress means 75% offset remaining?
    // DashOffset = 125.66 * (1 - 0.25) = 125.66 * 0.75 = 94.245
    const circleDebugContext = fixture.debugElement.nativeElement.querySelector('circle');
    // Using native element querySelector still, but maybe cleaner context?
    // Wait, the error was on host.querySelector.
    // Let's use By.css
    const circleDe = fixture.debugElement.query(By.css('circle'));
    expect(circleDe).toBeTruthy();
    if (circleDe) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const offset = parseFloat((circleDe.nativeElement as any).style.strokeDashoffset);
      expect(offset).toBeCloseTo(94.245, 1);
    }
  });
});
