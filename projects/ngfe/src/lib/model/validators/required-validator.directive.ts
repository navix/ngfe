import { Directive, Host, Input, OnChanges, OnInit } from '@angular/core';
import { coerceToBoolean } from '../../util';
import { FeModel } from '../fe-model.directive';

@Directive({
  selector: '[feModel][required]',
})
export class RequiredValidatorDirective implements OnInit, OnChanges {
  @Input() required!: boolean | string;

  readonly name = 'required';

  constructor(
    @Host() private model: FeModel,
  ) {
  }

  ngOnInit() {
    this.model.addValidators([{
      name: this.name,
      validator: ({value}) => {
        if (!coerceToBoolean(this.required)) {
          return;
        }
        return !value.value;
      },
    }]);
  }

  ngOnChanges() {
    this.model.updateValidity([this.name]);
  }
}
