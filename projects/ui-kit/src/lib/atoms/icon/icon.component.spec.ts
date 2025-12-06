import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaIconComponent } from './icon.component';

describe('QuantaIconComponent', () => {
  let fixture: ComponentFixture<QuantaIconComponent>;
  let component: QuantaIconComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantaIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render material icon when name is provided', () => {
    fixture.componentRef.setInput('name', 'settings');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('.material-icons'));
    expect(span).toBeTruthy();
    expect(span.nativeElement.textContent).toContain('settings');
  });

  it('should allow changing fontSet', () => {
    fixture.componentRef.setInput('name', 'settings');
    fixture.componentRef.setInput('fontSet', 'custom-font');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('.custom-font'));
    expect(span).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.material-icons'))).toBeFalsy();
  });
});
