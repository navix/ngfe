import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl } from '../core';
import { coerceToBoolean } from '../util';

@Directive({
  selector: '[feControl][isNumber]',
})
export class FeIsNumberValidatorDirective implements OnChanges {
  @Input() isNumber!: string | boolean;

  constructor(
    @Self() private control: FeControl<number, string>,
  ) {
    this.control.addValidator(({modelValue, inputValue}) => {
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
    });
  }

  ngOnChanges() {
    this.control.updateValidity();
  }

  get isEnabled() {
    return coerceToBoolean(this.isNumber);
  }
}
