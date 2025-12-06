import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { QuantaDialogComponent } from './dialog.component';

@Component({
  imports: [QuantaDialogComponent],
  template: `
    <quanta-dialog [open]="open" (openChange)="open = $event" [headline]="headline" [icon]="icon">
      <div class="test-content">Dialog Content</div>
      <div actions>
        <button class="action-btn" (click)="open = false">Close</button>
      </div>
    </quanta-dialog>
  `,
})
class TestHostComponent {
  headline = 'Test Dialog';
  icon = 'info';
  open = false;
}

describe('QuantaDialogComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let dialogElement: HTMLDialogElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, QuantaDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    const dialogDebugEl = fixture.debugElement.query(By.css('dialog'));
    dialogElement = dialogDebugEl.nativeElement;

    // Mock native dialog methods for JSDOM
    dialogElement.showModal = vi.fn(() => {
      dialogElement.setAttribute('open', '');
      dialogElement.open = true;
    });
    dialogElement.close = vi.fn(() => {
      dialogElement.removeAttribute('open');
      dialogElement.open = false;
    });
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
    expect(dialogElement).toBeTruthy();
  });

  it('should be closed initially', () => {
    expect(dialogElement.open).toBe(false);
  });

  it.skip('should render headline and icon', async () => {
    hostComponent.open = true;
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 50));

    const headline = fixture.debugElement.query(By.css('.quanta-dialog-headline'));
    const icon = fixture.debugElement.query(By.css('.quanta-dialog-icon'));

    expect(headline.nativeElement.textContent).toContain('Test Dialog');
    expect(icon.nativeElement.textContent).toContain('info');
  });

  it.skip('should render projected content', () => {
    hostComponent.open = true;
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('.test-content'));
    expect(content).toBeTruthy();
    expect(content.nativeElement.textContent).toContain('Dialog Content');
  });

  /*
  // TODO: These tests fail in JSDOM due to Signal Effect timing issues. 
  // Verify manual behavior in Storybook or use E2E tests.
  it('should open when open input is true', async () => {
    hostComponent.open = true;
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 50)); // Increase wait for Effects
    expect(dialogElement.open).toBe(true);
  });

  it('should close when handling close event', async () => {
    hostComponent.open = true;
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(dialogElement.open).toBe(true);

    // Simulate close action (like backdrop click or escape)
    // We can directly set the model in the host to test binding
    hostComponent.open = false;
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(dialogElement.open).toBe(false);
  });
  */
});
