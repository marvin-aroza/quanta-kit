import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  inject,
  input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.has-error]': 'hasError',
    '[class.has-label]': '!!label()',
    class: 'quanta-form-field',
  },
  imports: [CommonModule],
  selector: 'quanta-form-field',

  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
})
export class QuantaFormFieldComponent implements AfterContentInit, OnDestroy {
  @ContentChild(NgControl) control: NgControl | null = null;
  errorMessage = input<string>('');

  label = input<string>('');
  get hasError(): boolean {
    return !!this.errorMessage() || (!!this.control?.invalid && !!this.control?.touched);
  }

  private _cdr = inject(ChangeDetectorRef);

  private _destroy$ = new Subject<void>();

  ngAfterContentInit() {
    if (this.control?.statusChanges) {
      this.control.statusChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this._cdr.markForCheck();
      });
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
