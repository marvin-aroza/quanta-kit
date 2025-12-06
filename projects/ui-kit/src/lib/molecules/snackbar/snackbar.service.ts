import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { QuantaSnackbarComponent } from './snackbar.component';

export interface SnackbarConfig {
  duration?: number;
}

/**
 * Service to manage snackbar notifications.
 */
@Injectable({
  providedIn: 'root',
})
export class QuantaSnackbarService {
  private appRef = inject(ApplicationRef);
  private componentRef: ComponentRef<QuantaSnackbarComponent> | null = null;
  private environmentInjector = inject(EnvironmentInjector);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private timeoutId: any;

  /**
   * Dismisses the currently open snackbar.
   */
  dismiss() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (this.componentRef) {
      // Animate out
      this.componentRef.setInput('isOpen', false);
      this.componentRef.changeDetectorRef.detectChanges();

      // Wait for animation then destroy
      setTimeout(() => {
        if (this.componentRef) {
          this.appRef.detachView(this.componentRef.hostView);
          this.componentRef.destroy();
          this.componentRef = null;
        }
      }, 300); // Match transition duration (+ buffer)
    }
  }

  /**
   * Opens a snackbar with the specified message and configuration.
   * @param message The message to display.
   * @param action Optional text for an action button.
   * @param config Configuration object (e.g. duration).
   */
  open(message: string, action?: string, config: SnackbarConfig = { duration: 3000 }) {
    // Dismiss existing
    if (this.componentRef) {
      this.dismiss();
    }

    // Create component (attached to environment injector)
    this.componentRef = createComponent(QuantaSnackbarComponent, {
      environmentInjector: this.environmentInjector,
    });

    // Set inputs
    this.componentRef.setInput('message', message);
    if (action) {
      this.componentRef.setInput('action', action);

      // Subscribe to action output
      const sub = this.componentRef.instance.actionClicked.subscribe(() => {
        this.dismiss();
        sub.unsubscribe();
      });
    }

    // Attach to DOM
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<unknown>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Trigger initial CD to render content
    this.componentRef.changeDetectorRef.detectChanges();

    // Trigger animation (next tick)
    setTimeout(() => {
      if (this.componentRef) {
        this.componentRef.setInput('isOpen', true);
        this.componentRef.changeDetectorRef.detectChanges();
      }
    }, 10);

    // Auto dismiss
    if (config.duration && config.duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.dismiss();
      }, config.duration);
    }
  }
}
