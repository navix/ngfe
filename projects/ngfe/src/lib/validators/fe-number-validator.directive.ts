import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';

@Directive({
  selector: '[feControl][min],[feControl][max]',
})
export class FeNumberValidatorDirective implements OnChanges {
  @Input() min?: string | number | false;
  @Input() max?: string | number | false;

  validator: FeValidator<number> = ({modelValue, inputValue}) => {
    if (modelValue == null || typeof modelValue !== 'number') {
      return undefined;
    }
    if (this.normalizedMin !== undefined) {
      if (modelValue < this.normalizedMin) {
        return {
          min: {min: this.normalizedMin, modelValue: modelValue},
        };
      }
    }
    if (this.normalizedMax !== undefined) {
      if (modelValue > this.normalizedMax) {
        return {
          max: {max: this.normalizedMax, modelValue: modelValue},
        };
      }
    }
    return undefined;
  };

  private normalizedMin?: number;
  private normalizedMax?: number;

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.updateValidators({add: [this.validator]});
  }

  ngOnChanges() {
    this.normalizedMin = this.min != null ? +this.min : undefined;
    this.normalizedMax = this.max != null ? +this.max : undefined;
    this.control.updateValidity();
  }
}
