import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';
import { coerceToBoolean } from '../util';

@Directive({
  selector: '[feControl][required]',
})
export class FeRequiredValidatorDirective implements OnChanges {
  @Input() required!: boolean | string;
  validator: FeValidator<any> = ({value}) => {
    if (!this.isRequired) {
      return;
    }
    if (!value) {
      return {required: true};
    }
    return;
  };

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.updateValidators({add: [this.validator]});
  }

  ngOnChanges() {
    this.control.updateValidity();
  }

  get isRequired() {
    return coerceToBoolean(this.required);
  }
}
