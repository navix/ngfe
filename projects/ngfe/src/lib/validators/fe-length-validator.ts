import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: '[feControl][minlength],[feControl][maxlength]',
  exportAs: 'feLengthValidator',
})
export class FeLengthValidator implements OnChanges {
  @Input() minlength?: string | number | false;
  @Input() maxlength?: string | number | false;

  constructor(
    @Self() private control: FeControl<string | Array<any>>,
  ) {
    this.control.addValidator(({modelValue}) => {
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
    });
  }

  ngOnChanges() {
    this.control.updateValidity();
  }

  private hasValidLength(value: any): boolean {
    // non-strict comparison is intentional, to check for both `null` and `undefined` values
    return value != null && typeof value.length === 'number';
  }
}
