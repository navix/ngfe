import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appCustomNgValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomNgValidatorDirective),
      multi: true,
    },
  ],
})
export class CustomNgValidatorDirective implements Validator {
  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return {
        custom: true,
      };
    } else {
      return null;
    }
  }
}
