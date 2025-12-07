import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantaSegmentComponent } from './segment.component';
import { QuantaSegmentedButtonComponent } from './segmented-button.component';

@Component({
  imports: [QuantaSegmentedButtonComponent, QuantaSegmentComponent],
  standalone: true,
  template: `
    <quanta-segmented-button
      [multi]="multi"
      [selected]="selected"
      (selectedChange)="selected = $event"
    >
      <quanta-segment value="1" label="One"></quanta-segment>
      <quanta-segment value="2" label="Two"></quanta-segment>
    </quanta-segmented-button>
  `,
})
class TestHostComponent {
  multi = false;
  selected: string | string[] = '1';
}

describe('QuantaSegmentedButtonComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify initial selection', async () => {
    fixture.detectChanges(); // Ensure effects run
    await fixture.whenStable();

    const segments = fixture.nativeElement.querySelectorAll('quanta-segment');
    expect(segments[0].classList.contains('selected')).toBe(true);
    expect(segments[1].classList.contains('selected')).toBe(false);
  });

  it('should toggle selection in single mode', () => {
    const segments = fixture.nativeElement.querySelectorAll('quanta-segment');
    segments[1].click();
    fixture.detectChanges();

    expect(component.selected).toBe('2');
    expect(segments[0].classList.contains('selected')).toBe(false);
    expect(segments[1].classList.contains('selected')).toBe(true);
  });

  it('should toggle selection in multi mode', () => {
    component.multi = true;
    component.selected = ['1'];
    fixture.detectChanges();

    const segments = fixture.nativeElement.querySelectorAll('quanta-segment');
    segments[1].click(); // Select 2
    fixture.detectChanges();

    expect(component.selected).toEqual(['1', '2']);

    segments[0].click(); // Deselect 1
    fixture.detectChanges();
    expect(component.selected).toEqual(['2']);
  });
});
