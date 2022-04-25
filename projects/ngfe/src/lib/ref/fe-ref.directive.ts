import { Directive, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, NgControl, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

/**
 * Trigger validation on other form controls when changed.
 */
@Directive({
  selector: '[ngModel][feRef]',
})
export class FeRefDirective implements OnInit, OnDestroy {
  @Input() feRef?: NgModel | NgModel[];

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
        if (this.feRef) {
          const refs = Array.isArray(this.feRef) ? this.feRef : [this.feRef];
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
