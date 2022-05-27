import { Directive, Input, OnChanges, Self } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeControl, FeValidator } from '../core';
import { coerceToBoolean } from '../util';

@Directive({
  selector: '[feControl][required]',
})
export class FeRequiredValidatorDirective implements OnChanges {
  @Input() required!: boolean | string;

  private readonly _isEnabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.addValidator(({modelValue}) => {
      if (!this.isEnabled || modelValue) {
        return;
      }
      return {required: true};
    });
  }

  ngOnChanges() {
    this._isEnabled$.next(coerceToBoolean(this.required));
    this.control.updateValidity();
  }

  get isEnabled() {
    return this._isEnabled$.value;;
  }

  get isEnabled$() {
    return this._isEnabled$.asObservable();
  }
}
