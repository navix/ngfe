import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';

@Directive({
  selector: '[feControl][equal]',
})
export class FeEqualValidatorDirective implements OnChanges {
  @Input() equal: any;

  validator: FeValidator<string> = ({modelValue}) => {
    if (this.equal !== modelValue) {
      return {
        'equal': {
          equal: this.equal,
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
