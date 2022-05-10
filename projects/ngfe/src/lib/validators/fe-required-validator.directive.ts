import { Directive, Host, Input, OnChanges } from '@angular/core';
import { FeModel, FeValidator } from '../model';
import { coerceToBoolean } from '../util';

@Directive({
  selector: '[feModel][required]',
})
export class RequiredValidator implements OnChanges {
  @Input() required!: boolean | string;

  validator: FeValidator<any> = ({value}) => {
    if (!coerceToBoolean(this.required)) {
      return;
    }
    if (!value) {
      return {required: true};
    }
    return;
  };

  constructor(
    @Host() private model: FeModel,
  ) {
    this.model.updateValidators({add: [this.validator]});
  }

  ngOnChanges() {
    this.model.updateValidity();
  }
}
