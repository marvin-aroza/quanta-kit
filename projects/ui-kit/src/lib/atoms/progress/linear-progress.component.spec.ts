import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantaLinearProgressComponent } from './linear-progress.component';

describe('QuantaLinearProgressComponent', () => {
  let component: QuantaLinearProgressComponent;
  let fixture: ComponentFixture<QuantaLinearProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaLinearProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaLinearProgressComponent);
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
    expect(host.classList.contains('quanta-linear-progress-indeterminate')).toBe(true);
    expect(host.getAttribute('aria-valuenow')).toBeNull();
  });

  it('should reflect determinate value', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.getAttribute('aria-valuenow')).toBe('50');
    // We check inner style
    const bar = host.querySelector('.quanta-linear-progress-bar');
    // scaleX(0.5)
    expect(bar.style.transform).toContain('scaleX(0.5)');
  });
});
