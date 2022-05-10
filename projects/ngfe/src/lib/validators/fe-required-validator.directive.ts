import { Directive, Host, Input, OnChanges, OnInit } from '@angular/core';
import { FeModel } from '../model';
import { FeValidatorResult } from '../model/fe-validator';
import { coerceToBoolean } from '../util';

@Directive({
  selector: '[feModel][required]',
})
export class RequiredValidator implements OnInit, OnChanges {
  @Input() required!: boolean | string;

  constructor(
    @Host() private model: FeModel,
  ) {
  }

  ngOnInit() {
    this.model.addValidator(({value}): FeValidatorResult => {
      if (!coerceToBoolean(this.required)) {
        return;
      }
      if (!value.value) {
        return {required: true};
      }
    });
  }

  ngOnChanges() {
    this.model.updateValidity();
  }
}
