import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/**
 * Run function as validator.
 */
@Directive({
  selector: '[ngModel][feFn]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FeFnValidatorDirective,
    multi: true,
  }],
})
export class FeFnValidatorDirective implements Validator {
  @Input() feFn?: ((control: AbstractControl) => ValidationErrors | null) | false;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.feFn) {
      return null;
    }
    // @todo check is function
    return this.feFn(control);
  }
}
