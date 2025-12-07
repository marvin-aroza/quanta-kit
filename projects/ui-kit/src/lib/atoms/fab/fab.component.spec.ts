import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantaFabComponent } from './fab.component';

describe('QuantaFabComponent', () => {
  let component: QuantaFabComponent;
  let fixture: ComponentFixture<QuantaFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaFabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaFabComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('icon', 'add');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply size classes', () => {
    fixture.componentRef.setInput('size', 'small');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.classList.contains('size-small')).toBe(true);
  });

  it('should apply variant classes', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.classList.contains('variant-secondary')).toBe(true);
  });

  it('should render extended label', () => {
    fixture.componentRef.setInput('extended', true);
    fixture.componentRef.setInput('label', 'Create');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.classList.contains('extended')).toBe(true);
    expect(element.textContent?.trim()).toContain('Create');
  });

  it('should set aria-label', () => {
    fixture.componentRef.setInput('ariaLabel', 'Custom Label');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.getAttribute('aria-label')).toBe('Custom Label');
  });

  it('should use label for aria-label when extended', () => {
    fixture.componentRef.setInput('extended', true);
    fixture.componentRef.setInput('label', 'Create');
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.getAttribute('aria-label')).toBe('Create');
  });

  it('should have correct role and tabindex', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.getAttribute('role')).toBe('button');
    expect(element.getAttribute('tabindex')).toBe('0');
  });

  it('should trigger clicked output on Enter key', () => {
    const element = fixture.nativeElement as HTMLElement;
    let clicked = false;
    component.clicked.subscribe(() => (clicked = true));

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    element.dispatchEvent(event);
    expect(clicked).toBe(true);
  });

  it('should trigger clicked output on Space key', () => {
    const element = fixture.nativeElement as HTMLElement;
    let clicked = false;
    component.clicked.subscribe(() => (clicked = true));

    const event = new KeyboardEvent('keydown', { key: ' ' });
    element.dispatchEvent(event);
    expect(clicked).toBe(true);
  });
});
