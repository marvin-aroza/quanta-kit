import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.has-error]': 'hasError',
    '[class.has-label]': '!!label',
    class: 'quanta-form-field',
  },
  imports: [CommonModule],
  selector: 'quanta-form-field',
  standalone: true,
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
})
export class QuantaFormFieldComponent {
  @ContentChild(NgControl) control: NgControl | null = null;
  @Input() errorMessage = '';

  @Input() label = '';

  get hasError() {
    return !!this.errorMessage || (!!this.control?.invalid && !!this.control?.touched);
  }
}
