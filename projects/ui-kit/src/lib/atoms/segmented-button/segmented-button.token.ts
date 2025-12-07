import { Signal } from '@angular/core';

export abstract class QuantaSegmentedButtonToken {
  abstract disabled: Signal<boolean>;
  abstract multi: Signal<boolean>;
  abstract selected: Signal<unknown>;
  abstract toggle(value: unknown): void;
}
