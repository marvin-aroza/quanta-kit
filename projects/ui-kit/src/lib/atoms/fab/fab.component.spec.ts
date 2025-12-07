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
});
