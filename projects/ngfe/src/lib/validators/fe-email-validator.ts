import {booleanAttribute, Directive, inject, input, OnChanges} from '@angular/core';
import {FeModel} from '../core/fe-model';

@Directive({
  selector: '[model][email]',
  exportAs: 'emailValidator',
})
export class FeEmailValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly email = input(true, {transform: booleanAttribute});

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

  constructor() {
    this.model.addValidator(value => {
      if (!this.email() || !value) {
        return;
      }
      return this.emailRegexp.test(value) ? undefined : {email: {value}};
    });
  }

  // @todo switch to effect?
  ngOnChanges() {
    this.model.updateValidity();
  }
}
