import { Directive, Self } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { FeControl } from 'ngfe';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class LocalControl {
  statusChanges: Observable<'DISABLED' | 'VALID' | 'INVALID' | 'PENDING'>;
  valueChanges: Observable<any>;

  constructor(private feControl: FeControl) {
    this.statusChanges = merge(this.feControl.validity$, this.feControl.disabled$).pipe(map(() => this.status));
    this.valueChanges = this.feControl.modelValue$;
  }

  patchValue(value: any, options?: Object): void {
    this.feControl.update(value);
  }

  reset(value?: any, options?: Object): void {
    this.feControl.reset();
  }

  setValue(value: any, options?: Object): void {
    this.feControl.update(value);
  }

  get value() {
    return this.feControl.modelValue;
  }

  get status(): 'DISABLED' | 'VALID' | 'INVALID' | 'PENDING' {
    if (this.feControl.disabled) {
      return 'DISABLED';
    } else if (this.feControl.validity === 'valid') {
      return 'VALID';
    } else if (this.feControl.validity === 'invalid') {
      return 'INVALID';
    } else {
      return 'PENDING';
    }
  }

  get valid() {
    return this.feControl.valid;
  }

  get invalid() {
    return this.feControl.invalid;
  }

  get untouched() {
    return !this.feControl.touched;
  }

  get touched() {
    return this.feControl.touched;
  }

  get pristine() {
    return !this.feControl.dirty;
  }

  get dirty() {
    return this.feControl.dirty;
  }

  get pending() {
    return this.feControl.pending;
  }
}

@Directive({
  selector: '[feControl]',
  providers: [
    {
      provide: NgControl,
      useExisting: FeNgControlDirective,
    },
  ],
})
export class FeNgControlDirective extends NgControl {
  private _control?: LocalControl;

  constructor(@Self() private feControl: FeControl) {
    super();
    this._control = new LocalControl(this.feControl);
  }

  get control(): AbstractControl {
    return this._control as any;
  }

  viewToModelUpdate(newValue: any) {}
}
