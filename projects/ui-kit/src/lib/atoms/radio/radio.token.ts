import { InjectionToken } from '@angular/core';

export interface QuantaRadioGroup {
  selectValue(value: unknown): void;
}

export const QUANTA_RADIO_GROUP = new InjectionToken<QuantaRadioGroup>('QuantaRadioGroup');
