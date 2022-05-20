import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';
import { coerceToBoolean } from '../util';

@Directive({
  selector: '[feControl][isNumber]',
})
export class FeIsNumberValidatorDirective implements OnChanges {
  @Input() isNumber!: string | boolean;

  validator: FeValidator<number, string> = ({modelValue, inputValue}) => {
    if (!this.isEnabled) {
      return undefined;
    }
    if (modelValue != null && typeof modelValue !== 'number') {
      return {
        isNumber: {
          modelValue,
        },
      };
    }
    if (inputValue != null && inputValue !== '' && isNaN(+inputValue)) {
      return {
        isNumber: {
          inputValue,
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

  get isEnabled() {
    return coerceToBoolean(this.isNumber);
  }
}
