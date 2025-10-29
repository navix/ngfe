import {Directive, inject, input, OnChanges} from '@angular/core';
import {FeModel} from '../core/fe-model';

@Directive({
  selector: '[model][minLength],[model][maxLength]',
  exportAs: 'lengthValidator',
})
export class FeLengthValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly minLength = input<string | number | false>();
  readonly maxLength = input<string | number | false>();

  constructor() {
    this.model.addValidator(value => {
      if (value === '') {
        return undefined;
      }
      if (!this.hasValidLength(value)) {
        return undefined;
      }
      const actualLength = value!.length;
      const minLength = this.minLength();
      const maxLength = this.maxLength();
      if (minLength !== undefined) {
        const requiredLength = +minLength;
        if (actualLength < requiredLength) {
          return {minLength: {requiredLength, actualLength, value}};
        }
      }
      if (maxLength !== undefined) {
        const requiredLength = +maxLength;
        if (actualLength > requiredLength) {
          return {maxLength: {requiredLength, actualLength, value}};
        }
      }
      return undefined;
    });
  }

  ngOnChanges() {
    this.model.updateValidity();
  }

  private hasValidLength(value: any): boolean {
    // non-strict comparison is intentional, to check for both `null` and `undefined` values
    return value != null && typeof value.length === 'number';
  }
}
