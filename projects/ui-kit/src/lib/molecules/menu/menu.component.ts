import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'quanta-menu-wrapper',
  },
  imports: [],
  selector: 'quanta-menu',
  standalone: true,
  styleUrl: './menu.component.scss',
  template: `
    @if (open()) {
      <div class="quanta-menu-surface" [class.open]="open()" tabindex="-1" role="menu">
        <ng-content></ng-content>
      </div>
    }
  `,
})
export class QuantaMenuComponent {
  open = model<boolean>(false);
  trigger = input<HTMLElement>();

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      if (this.open()) {
        setTimeout(() => {
          const firstItem = this.elementRef.nativeElement.querySelector('[role="menuitem"]');
          if (firstItem) {
            (firstItem as HTMLElement).focus();
          } else {
            (
              this.elementRef.nativeElement.querySelector('.quanta-menu-surface') as HTMLElement
            )?.focus();
          }
        });
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.open()) return;

    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);
    const clickedTrigger = this.trigger()?.contains(target);

    if (!clickedInside && !clickedTrigger) {
      this.open.set(false);
    }
  }

  @HostListener('keydown.escape')
  onEscape() {
    if (this.open()) {
      this.open.set(false);
      this.trigger()?.focus();
    }
  }
}
