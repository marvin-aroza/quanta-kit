import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.has-error]': 'hasError()',
    '[class.has-label]': '!!label()',
    class: 'quanta-form-field',
  },
  imports: [CommonModule],
  selector: 'quanta-form-field',

  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
})
export class QuantaFormFieldComponent {
  @ContentChild(NgControl) control: NgControl | null = null;
  errorMessage = input<string>('');
  hasError = computed(() => {
    return !!this.errorMessage() || (!!this.control?.invalid && !!this.control?.touched);
  });

  label = input<string>('');
}
