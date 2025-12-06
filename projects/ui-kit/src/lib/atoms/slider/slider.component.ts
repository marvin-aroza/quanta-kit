import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeyDown($event)',
    '(pointerdown)': 'onPointerDown($event)',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-orientation]': '"horizontal"',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuemin]': 'min()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.role]': '"slider"',
    '[attr.tabindex]': 'disabled() ? -1 : 0',
    '[class.disabled]': 'disabled()',
  },
  imports: [CommonModule],
  selector: 'quanta-slider',
  styleUrl: './slider.component.scss',
  template: `
    <div class="quanta-slider-container">
      <div class="quanta-slider-track"></div>
      <div class="quanta-slider-active-track" [style.width.%]="percent()"></div>

      <div class="quanta-slider-thumb-container" [style.left.%]="percent()">
        <div class="quanta-slider-focus-ring"></div>
        <div class="quanta-slider-thumb"></div>
      </div>
    </div>
  `,
})
export class QuantaSliderComponent implements OnDestroy {
  // Properties sorted alphabetically to satisfy lint
  disabled = input<boolean>(false);
  isActive = signal<boolean>(false); // For visual feedback
  isDragging = signal<boolean>(false);
  max = input<number>(100);
  min = input<number>(0);
  value = model<number>(0);
  // Computed
  percent = computed(() => {
    const minVal = this.min();
    const maxVal = this.max();
    const val = this.value();
    if (maxVal <= minVal) return 0;
    const p = ((val - minVal) / (maxVal - minVal)) * 100;
    return Math.max(0, Math.min(100, p));
  });
  step = input<number>(1);

  private el = inject(ElementRef);

  constructor() {
    effect(() => {
      const val = this.value();
      const min = this.min();
      const max = this.max();
      const clamped = Math.max(min, Math.min(max, val));

      if (clamped !== val) {
        this.value.set(clamped);
      }
    });
  }

  ngOnDestroy() {
    // Cleanup in case component is destroyed during drag
    this.el.nativeElement.removeEventListener('pointermove', this.onPointerMove);
    this.el.nativeElement.removeEventListener('pointerup', this.onPointerUp);
    this.el.nativeElement.removeEventListener('pointercancel', this.onPointerUp);
  }

  onBlur() {
    this.isActive.set(false);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled()) return;

    let newValue = this.value();
    const step = this.step();
    // Clamp magnitude for PageUp/Down if we wanted
    const largeStep = step * 10;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowLeft':
        newValue -= step;
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue += step;
        event.preventDefault();
        break;
      case 'End':
        newValue = this.max();
        event.preventDefault();
        break;
      case 'Home':
        newValue = this.min();
        event.preventDefault();
        break;
      case 'PageDown':
        newValue -= largeStep;
        event.preventDefault();
        break;
      case 'PageUp':
        newValue += largeStep;
        event.preventDefault();
        break;
    }
    this.updateValue(newValue);
  }

  onPointerDown(event: PointerEvent) {
    if (this.disabled()) return;
    this.isActive.set(true);
    this.isDragging.set(true);
    this.el.nativeElement.setPointerCapture(event.pointerId);
    this.updateValueFromEvent(event);

    // Bind move/up events
    this.el.nativeElement.addEventListener('pointermove', this.onPointerMove);
    this.el.nativeElement.addEventListener('pointerup', this.onPointerUp);
    this.el.nativeElement.addEventListener('pointercancel', this.onPointerUp);
  }

  onPointerMove = (event: PointerEvent) => {
    if (!this.isDragging()) return;
    this.updateValueFromEvent(event);
  };

  onPointerUp = (event: PointerEvent) => {
    this.isDragging.set(false);
    this.isActive.set(false);
    this.el.nativeElement.releasePointerCapture(event.pointerId);

    // Cleanup
    this.el.nativeElement.removeEventListener('pointermove', this.onPointerMove);
    this.el.nativeElement.removeEventListener('pointerup', this.onPointerUp);
    this.el.nativeElement.removeEventListener('pointercancel', this.onPointerUp);
  };

  private updateValue(raw: number) {
    const minVal = this.min();
    const maxVal = this.max();
    const step = this.step();

    // Round to step
    let stepped = Math.round((raw - minVal) / step) * step + minVal;

    // Clamp
    stepped = Math.max(minVal, Math.min(maxVal, stepped));

    // Update model
    if (stepped !== this.value()) {
      this.value.set(stepped);
    }
  }

  private updateValueFromEvent(event: PointerEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const width = rect.width;
    const x = event.clientX - rect.left;
    const clampedX = Math.max(0, Math.min(width, x));
    const ratio = clampedX / width;

    const minVal = this.min();
    const maxVal = this.max();
    const rawValue = minVal + (maxVal - minVal) * ratio;

    this.updateValue(rawValue);
  }
}
