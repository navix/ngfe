import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';
import { coerceToBoolean } from '../util';

@Directive({
  selector: '[feControl][email]',
})
export class FeEmailValidatorDirective implements OnChanges {
  @Input() email!: boolean | string;

  /**
   * @license Copyright Google LLC All Rights Reserved.
   *
   * It is based on the
   * [WHATWG version](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
   * some enhancements to incorporate more RFC rules (such as rules related to domain names and the
   * lengths of different parts of the address). The main differences from the WHATWG version are:
   *   - Disallow `local-part` to begin or end with a period (`.`).
   *   - Disallow `local-part` length to exceed 64 characters.
   *   - Disallow total address length to exceed 254 characters.
   */
  private readonly emailRegexp =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  validator: FeValidator<string> = ({modelValue}) => {
    if (!this.isEnabled || !modelValue) {
      return;
    }
    return this.emailRegexp.test(modelValue) ? undefined : {'email': true};
  };

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.updateValidators({add: [this.validator]});
  }

  ngOnChanges() {
    this.control.updateValidity();
  }

  get isEnabled() {
    return coerceToBoolean(this.email);
  }
}
