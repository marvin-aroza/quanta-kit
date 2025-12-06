import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QuantaTooltipComponent } from './tooltip.component';
import { QuantaTooltipDirective, TooltipPosition } from './tooltip.directive';

@Component({
  imports: [QuantaTooltipDirective],
  standalone: true, // Assuming host component should be standalone for test simplicity
  template: ` <button [quantaTooltip]="tooltipText" [position]="position">Test Button</button> `,
})
class TestHostComponent {
  position: TooltipPosition = 'below';
  tooltipText = 'Test Tooltip';
}

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
    // Cleanup any stray tooltips
    const tooltips = document.querySelectorAll('.quanta-tooltip');
    tooltips.forEach((t) => t.remove());
  });

  it('should create an instance', () => {
    const directive = fixture.debugElement.query(By.directive(QuantaTooltipDirective));
    expect(directive).toBeTruthy();
  });

  it('should show tooltip on mouseenter', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    tick(100); // Wait for requestAnimationFrame

    const tooltip = document.querySelector('.quanta-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toContain('Test Tooltip');

    // Test Cleanup
    button.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
    tick(300); // Wait for transition timeout

    expect(document.querySelector('.quanta-tooltip')).toBeFalsy();
  }));

  it('should set aria-describedby on host', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('mouseenter', {});
    fixture.detectChanges();
    tick(100);

    const tooltip = document.querySelector('.quanta-tooltip');
    const tooltipId = tooltip?.getAttribute('id');
    const buttonAttr = button.nativeElement.getAttribute('aria-describedby');

    expect(tooltipId).toBeTruthy();
    expect(buttonAttr).toBe(tooltipId);

    // Cleanup
    button.triggerEventHandler('mouseleave', {});
    fixture.detectChanges();
    tick(300);
  }));
});
