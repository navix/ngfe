import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: '[feControl][notEqual]',
  exportAs: 'feNotEqualValidator',
})
export class FeNotEqualValidator implements OnChanges {
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
