import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantaSliderComponent } from './slider.component';

describe('QuantaSliderComponent', () => {
  let component: QuantaSliderComponent;
  let fixture: ComponentFixture<QuantaSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have slider role', () => {
    const host = fixture.nativeElement;
    expect(host.getAttribute('role')).toBe('slider');
  });

  it('should respect min and max', () => {
    // Default 0-100
    component.value.set(150);
    fixture.detectChanges();

    // Logic updates model only on interaction, but if value is set externally it should probably ideally be clamped?
    // The component TS currently clamps only on updateValue (interaction).
    // UPDATE: Now checking if it clamps via effect.

    // We can't easily check style % without computation, but let's check aria-valuenow.

    const host = fixture.nativeElement;
    // Should be clamped to max (100)
    expect(host.getAttribute('aria-valuenow')).toBe('100');
  });

  it('should handle keyboard interaction', () => {
    component.value.set(50);
    fixture.detectChanges();

    const host = fixture.debugElement.nativeElement;
    // Arrow Right
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.value()).toBe(51); // Step 1 default

    // Arrow Left
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    expect(component.value()).toBe(50);
  });

  it('should clamp values on interaction', () => {
    component.value.set(100);
    fixture.detectChanges();

    const host = fixture.debugElement.nativeElement;
    // Arrow Right at Max
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.value()).toBe(100); // Should not exceed max
  });
});
