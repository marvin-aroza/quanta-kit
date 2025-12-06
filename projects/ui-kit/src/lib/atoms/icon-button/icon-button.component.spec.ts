import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantaIconButtonComponent } from './icon-button.component';

describe('QuantaIconButtonComponent', () => {
  let fixture: ComponentFixture<QuantaIconButtonComponent>;
  let component: QuantaIconButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply variant classes', () => {
    fixture.componentRef.setInput('variant', 'filled');
    fixture.detectChanges();
    expect(fixture.debugElement.classes['filled']).toBe(true);

    fixture.componentRef.setInput('variant', 'outlined');
    fixture.detectChanges();
    expect(fixture.debugElement.classes['outlined']).toBe(true);
  });

  it('should handle toggle state', () => {
    fixture.componentRef.setInput('toggle', true);
    fixture.detectChanges();

    const host = fixture.debugElement; // Host element
    host.triggerEventHandler('click', new Event('click')); // Trigger click on host
    fixture.detectChanges();

    expect(component.selected()).toBe(true);
    expect(fixture.debugElement.classes['selected']).toBe(true);
    expect(fixture.debugElement.attributes['aria-pressed']).toBe('true');

    host.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    expect(component.selected()).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('toggle', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const host = fixture.debugElement;
    host.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    expect(component.selected()).toBe(false);
  });
});
