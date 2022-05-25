import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';

@Directive({
  selector: '[feControl][minlength],[feControl][maxlength]',
})
export class FeLengthValidatorDirective implements OnChanges {
  @Input() minlength?: string | number | false;
  @Input() maxlength?: string | number | false;

  validator: FeValidator<string | Array<any>> = ({modelValue}) => {
    if (!this.hasValidLength(modelValue)) {
      return undefined;
    }
    const actualLength = modelValue!.length;
    if (this.minlength !== undefined) {
      const requiredLength = +this.minlength;
      if (actualLength < requiredLength) {
        return {minlength: {requiredLength, actualLength}};
      }
    }
    if (this.maxlength !== undefined) {
      const requiredLength = +this.maxlength;
      if (actualLength > requiredLength) {
        return {maxlength: {requiredLength, actualLength}};
      }
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

  private hasValidLength(value: any): boolean {
    // non-strict comparison is intentional, to check for both `null` and `undefined` values
    return value != null && typeof value.length === 'number';
  }
}
