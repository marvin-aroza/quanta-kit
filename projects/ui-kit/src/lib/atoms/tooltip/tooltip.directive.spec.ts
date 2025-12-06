import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaTooltipComponent } from './tooltip.component';
import { QuantaTooltipDirective, TooltipPosition } from './tooltip.directive';

@Component({
  imports: [QuantaTooltipDirective],
  standalone: true,
  template: ` <button [quantaTooltip]="tooltipText" [position]="position">Test Button</button> `,
})
class TestHostComponent {
  position: TooltipPosition = 'below';
  tooltipText = 'Test Tooltip';
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('QuantaTooltipDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, QuantaTooltipDirective, QuantaTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    const tooltips = document.querySelectorAll('.quanta-tooltip');
    tooltips.forEach((t) => t.remove());
  });

  it('should create an instance', () => {
    const directive = fixture.debugElement.query(By.directive(QuantaTooltipDirective));
    expect(directive).toBeTruthy();
  });

  it('should show tooltip on mouseenter', async () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    await delay(100); // Wait for RAF and dynamic creation

    const tooltip = document.querySelector('.quanta-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toContain('Test Tooltip');

    // Cleanup
    button.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();

    await delay(300); // Wait for transition

    expect(document.querySelector('.quanta-tooltip')).toBeFalsy();
  });

  it('should set aria-describedby on host', async () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    await delay(100);

    const tooltip = document.querySelector('.quanta-tooltip');
    const tooltipId = tooltip?.getAttribute('id');
    const buttonAttr = button.nativeElement.getAttribute('aria-describedby');

    expect(tooltipId).toBeTruthy();
    expect(buttonAttr).toBe(tooltipId);

    // Cleanup
    button.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();

    await delay(300);
  });
});
