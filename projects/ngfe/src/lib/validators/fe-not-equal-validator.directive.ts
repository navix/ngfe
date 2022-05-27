import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';

@Directive({
  selector: '[feControl][notEqual]',
})
export class FeNotEqualValidatorDirective implements OnChanges {
  @Input() notEqual: any;

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.addValidator(({modelValue}) => {
      if (this.notEqual === modelValue) {
        return {
          'notEqual': {
            notEqual: this.notEqual,
            modelValue,
          },
        };
      }
      return undefined;
    });
  }

  ngOnChanges() {
    this.control.updateValidity();
  }
}
