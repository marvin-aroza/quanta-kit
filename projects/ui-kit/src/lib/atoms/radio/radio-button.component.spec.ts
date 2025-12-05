import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaRadioButtonComponent } from './radio-button.component';
import { QUANTA_RADIO_GROUP, QuantaRadioGroup } from './radio.token';

describe('QuantaRadioButtonComponent', () => {
  let component: QuantaRadioButtonComponent;
  let fixture: ComponentFixture<QuantaRadioButtonComponent>;
  let mockRadioGroup: Pick<QuantaRadioGroup, 'selectValue'>;

  beforeEach(async () => {
    mockRadioGroup = {
      selectValue: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [QuantaRadioButtonComponent],
      providers: [{ provide: QUANTA_RADIO_GROUP, useValue: mockRadioGroup }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'test-value');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', async () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    await fixture.whenStable();
    const labelEl = fixture.debugElement.query(By.css('.label-text'));
    expect(labelEl.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('should have correct value', () => {
    expect(component.value()).toBe('test-value');
  });

  it('should support aria-label', () => {
    fixture.componentRef.setInput('aria-label', 'Custom Label');
    fixture.detectChanges();
    expect(component.ariaLabel()).toBe('Custom Label');
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl.nativeElement.getAttribute('aria-label')).toBe('Custom Label');
  });

  it('should use label as aria-label fallback', () => {
    fixture.componentRef.setInput('label', 'Fallback Label');
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl.nativeElement.getAttribute('aria-label')).toBe('Fallback Label');
  });

  it('should have default id', () => {
    expect(component.id()).toMatch(/quanta-radio-button-\d+/);
  });

  it('should call group.selectValue on click', () => {
    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.triggerEventHandler('change', { stopPropagation: vi.fn() });
    expect(mockRadioGroup.selectValue).toHaveBeenCalledWith('test-value');
  });

  it('should not call group.selectValue when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    inputEl.triggerEventHandler('change', { stopPropagation: vi.fn() });
    expect(mockRadioGroup.selectValue).not.toHaveBeenCalled();
  });

  it('should update checked state', () => {
    component.setChecked(true);
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
    expect(fixture.nativeElement.classList).toContain('checked');
  });

  it('should update disabled state from group', () => {
    component.setGroupDisabled(true);
    fixture.detectChanges();
    expect(component.isDisabled()).toBe(true);
    expect(fixture.nativeElement.classList).toContain('disabled');
  });
});

describe('QuantaRadioButtonComponent without Group', () => {
  let component: QuantaRadioButtonComponent;
  let fixture: ComponentFixture<QuantaRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaRadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'test-value');
    fixture.detectChanges();
  });

  it('should create without group and warn', () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    // Re-create component to trigger constructor
    fixture = TestBed.createComponent(QuantaRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'test-value');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(consoleSpy).toHaveBeenCalledWith(
      'QuantaRadioButtonComponent must be used within a QuantaRadioGroupComponent',
    );
  });

  it('should not throw when clicked without group', () => {
    const inputEl = fixture.debugElement.query(By.css('input'));
    // Should not throw error
    expect(() => {
      inputEl.triggerEventHandler('change', { stopPropagation: vi.fn() });
    }).not.toThrow();
  });
});
