import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantaTabComponent } from './tab.component';

describe('QuantaTabComponent', () => {
  let component: QuantaTabComponent;
  let fixture: ComponentFixture<QuantaTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaTabComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test Tab');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept inputs', () => {
    fixture.componentRef.setInput('label', 'New Label');
    fixture.componentRef.setInput('icon', 'home');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(component.label()).toBe('New Label');
    expect(component.icon()).toBe('home');
    expect(component.disabled()).toBe(true);
  });

  it('should toggle content visibility based on active signal', () => {
    component.active.set(true);
    fixture.detectChanges();
    // Element visibility check via styling or class might be needed if we want to be strict,
    // but the template is [hidden]="!active()"
    const div = fixture.nativeElement.querySelector('.quanta-tab-panel');
    expect(div.hidden).toBe(false);

    component.active.set(false);
    fixture.detectChanges();
    expect(div.hidden).toBe(true);
  });
});
