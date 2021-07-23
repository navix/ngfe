import { Directive, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgControl, NgForm, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

/**
 * Trigger validation on other form controls when changed.
 */
@Directive({
  selector: '[ngModel][validationRef]',
})
export class ValidationRefDirective implements OnInit, OnDestroy {
  @Input() validationRef?: NgModel | string | (NgModel | string)[];

  private destroy = new Subject();

  constructor(
    @Host() private control: NgControl,
    @Optional() private ngForm: NgForm,
  ) {
  }

  ngOnInit() {
    this.control
      .control!
      .valueChanges
      .pipe(
        delay(1),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        if (this.validationRef) {
          const refs = Array.isArray(this.validationRef) ? this.validationRef : [this.validationRef];
          refs.forEach(ref => {
            if (typeof ref === 'string') {
              const formControl = this.ngForm.form.get(ref);
              if (!formControl) {
                throw new Error(`Form control with name "${ref}" not found.`);
              }
              this.updateControl(formControl);
            } else {
              this.updateControl(ref.control);
            }
          });
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private updateControl(control: AbstractControl) {
    if (!control) {
      return;
    }
    if (this.control.dirty && this.control.touched) {
      control.markAsTouched();
    }
    control.updateValueAndValidity({ emitEvent: false });
  }
}
