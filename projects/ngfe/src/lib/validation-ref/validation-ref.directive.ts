import { Directive, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, NgControl, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

/**
 * Trigger validation on other form controls when changed.
 */
// @todo -> [ref]
@Directive({
  selector: '[ngModel][ref]',
})
export class ValidationRefDirective implements OnInit, OnDestroy {
  @Input() ref?: NgModel | NgModel[];

  private destroy = new Subject();

  constructor(
    @Host() private control: NgControl,
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
        if (this.ref) {
          const refs = Array.isArray(this.ref) ? this.ref : [this.ref];
          refs.forEach(ref => {
            this.updateControl(ref.control);
          });
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private updateControl(control: AbstractControl) {
    if (this.control.dirty && this.control.touched) {
      control.markAsTouched();
    }
    control.updateValueAndValidity({emitEvent: false});
  }
}
