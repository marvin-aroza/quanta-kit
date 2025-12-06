import {
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  EnvironmentInjector,
  inject,
  input,
  OnDestroy,
} from '@angular/core';
import { QuantaTooltipComponent } from './tooltip.component';

export type TooltipPosition = 'above' | 'below' | 'left' | 'right';

@Directive({
  host: {
    '(blur)': 'hide()',
    '(focus)': 'show()',
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
  },
  selector: '[quantaTooltip]',
})
export class QuantaTooltipDirective implements OnDestroy {
  position = input<TooltipPosition>('below');
  quantaTooltip = input.required<string>();

  private componentRef: ComponentRef<QuantaTooltipComponent> | null = null;
  private elementRef = inject(ElementRef<HTMLElement>);

  private injector = inject(EnvironmentInjector);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private timer: any;

  hide() {
    if (!this.componentRef) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    domElem.classList.remove('visible');

    // Wait for transition to finish before destroying
    // Simple timeout slightly longer than CSS transition (0.2s)
    this.timer = setTimeout(() => {
      this.destroy();
    }, 200);
  }

  ngOnDestroy() {
    this.destroy();
  }

  show() {
    // If we are pending destruction (mouse left but came back), cancel it.
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
      if (this.componentRef) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
        domElem.classList.add('visible');
      }
      return;
    }

    if (this.componentRef || !this.quantaTooltip()) return;

    // Create the tooltip component dynamically
    this.componentRef = createComponent(QuantaTooltipComponent, {
      environmentInjector: this.injector,
    });

    // Set text input
    this.componentRef.setInput('text', this.quantaTooltip());
    this.componentRef.changeDetectorRef.detectChanges();

    // Attach to body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Propagate theme (data-theme) from host context to tooltip
    const themeContext = this.elementRef.nativeElement.closest('[data-theme]');
    if (themeContext) {
      const theme = themeContext.getAttribute('data-theme');
      if (theme) {
        domElem.setAttribute('data-theme', theme);
      }
    }

    // Accessibility: Link tooltip to host
    const id = `quanta-tooltip-${Math.random().toString(36).substring(2, 11)}`;
    domElem.setAttribute('id', id);
    this.elementRef.nativeElement.setAttribute('aria-describedby', id);

    // Calculate Position
    this.setPosition(domElem);

    // Trigger animation
    requestAnimationFrame(() => {
      domElem.classList.add('visible');
    });
  }

  private destroy() {
    if (this.componentRef) {
      // Manually remove from DOM to ensure cleanup
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
      this.elementRef.nativeElement.removeAttribute('aria-describedby'); // Cleanup ARIA
      domElem.remove();

      this.componentRef.destroy();
      this.componentRef = null;
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private setPosition(tooltip: HTMLElement) {
    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Default: Below
    let top = hostRect.bottom + 8;
    let left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;

    switch (this.position()) {
      case 'above':
        top = hostRect.top - tooltipRect.height - 8;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + 8;
        break;
    }

    // Use absolute positioning with scroll offsets so it moves with the page
    const absTop = top + window.scrollY;
    const absLeft = left + window.scrollX;

    tooltip.style.position = 'absolute';
    tooltip.style.top = `${absTop}px`;
    tooltip.style.left = `${absLeft}px`;
  }
}
