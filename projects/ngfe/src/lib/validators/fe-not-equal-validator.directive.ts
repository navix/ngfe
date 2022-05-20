import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';

@Directive({
  selector: '[feControl][notEqual]',
})
export class FeNotEqualValidatorDirective implements OnChanges {
  @Input() notEqual: any;

  validator: FeValidator<string> = ({modelValue}) => {
    if (this.notEqual === modelValue) {
      return {
        'notEqual': {
          notEqual: this.notEqual,
          modelValue,
        },
      };
    }
    return undefined;
  };

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.updateValidators({add: [this.validator]});
  }

  ngOnChanges() {
    this.control.updateValidity();
  }
}
