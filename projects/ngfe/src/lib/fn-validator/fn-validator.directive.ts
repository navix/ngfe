import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/**
 * Run function as validator.
 */
// @todo -> [fn]
@Directive({
  selector: '[ngModel][fn]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FnValidatorDirective,
    multi: true,
  }],
})
export class FnValidatorDirective implements Validator {
  @Input() fn?: ((control: AbstractControl) => ValidationErrors | null) | false;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.fn) {
      return null;
    }
    // @todo check is function
    return this.fn(control);
  }
}
