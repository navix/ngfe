import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/**
 * Run function as validator.
 */
@Directive({
  selector: '[ngModel][fnValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FnValidatorDirective,
    multi: true,
  }],
})
export class FnValidatorDirective implements Validator {
  @Input() fnValidator?: ((control: AbstractControl) => ValidationErrors | null) | false;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.fnValidator) {
      return null;
    }
    // @todo check is function
    return this.fnValidator(control);
  }
}
