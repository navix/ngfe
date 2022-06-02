import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: '[feControl][min],[feControl][max]',
})
export class FeNumberValidatorDirective implements OnChanges {
  @Input() min?: string | number | false;
  @Input() max?: string | number | false;

  private normalizedMin?: number;
  private normalizedMax?: number;

  constructor(
    @Self() private control: FeControl<number>,
  ) {
    this.control.addValidator(({modelValue, inputValue}) => {
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
    });
  }

  ngOnChanges() {
    this.normalizedMin = this.min != null ? +this.min : undefined;
    this.normalizedMax = this.max != null ? +this.max : undefined;
    this.control.updateValidity();
  }
}
