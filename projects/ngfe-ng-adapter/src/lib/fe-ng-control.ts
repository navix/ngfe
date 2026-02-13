import {Directive, Input, Self} from '@angular/core';
import {AbstractControl, ControlContainer, NgControl} from '@angular/forms';
import {FeModel} from 'ngfe';
import {merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

class LocalControl {
  statusChanges: Observable<'DISABLED' | 'VALID' | 'INVALID' | 'PENDING'>;
  valueChanges: Observable<any>;

  constructor(private model: FeModel) {
    this.statusChanges = merge(this.model.validity$, this.model.disabledWithForm$).pipe(
      map(() => this.status),
    );
    this.valueChanges = this.model.value$;
  }

  hasValidator() {}

  patchValue(value: any, options?: Object): void {
    this.model.update(value);
  }

  reset(value?: any, options?: Object): void {
    this.model.reset();
  }

  setValue(value: any, options?: Object): void {
    this.model.update(value);
  }

  get value() {
    return this.model.value();
  }

  get status(): 'DISABLED' | 'VALID' | 'INVALID' | 'PENDING' {
    if (this.model.disabledWithForm()) {
      return 'DISABLED';
    } else if (this.model.validity() === 'valid') {
      return 'VALID';
    } else if (this.model.validity() === 'invalid') {
      return 'INVALID';
    } else {
      return 'PENDING';
    }
  }

  get valid() {
    return this.model.valid;
  }

  get invalid() {
    return this.model.invalid;
  }

  get untouched() {
    return !this.model.touched;
  }

  get touched() {
    return this.model.touched;
  }

  get pristine() {
    return !this.model.dirty;
  }

  get dirty() {
    return this.model.dirty;
  }

  get pending() {
    return this.model.pending;
  }

  markAsTouched() {
    this.model.touch();
  }

  markAllAsTouched() {
    this.model.touch();
  }

  markAsUntouched() {
    this.model.touched.set(false);
  }

  markAsDirty() {
    this.model.dirty.set(true);
  }

  markAsPristine() {
    this.model.dirty.set(false);
  }

  markAsPending() {}

  disable() {
    this.model.disabled.set(true);
  }

  enable() {
    this.model.disabled.set(false);
  }

  setParent() {}

  updateValueAndValidity() {
    this.model.updateValidity();
  }

  setErrors() {}

  get() {}

  getError(errorCode: string) {
    return this.model.errors()?.[errorCode];
  }

  hasError(errorCode: string) {
    return !!this.model.errors()?.[errorCode];
  }

  root() {}
}

@Directive({
  selector: '[feControl]',
  providers: [
    {
      provide: NgControl,
      useExisting: FeNgControl,
    },
    {
      provide: ControlContainer,
      useExisting: FeNgControl,
    },
  ],
  standalone: false,
})
export class FeNgControl extends NgControl {
  @Input() name!: string | null;

  private _control?: LocalControl;

  constructor(@Self() private model: FeModel) {
    super();
    this._control = new LocalControl(this.model);
  }

  get control(): AbstractControl {
    return this._control as any;
  }

  viewToModelUpdate(newValue: any) {}

  formDirective() {}

  get path() {
    return null;
  }
}
