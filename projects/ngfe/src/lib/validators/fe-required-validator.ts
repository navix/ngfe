import {booleanAttribute, Directive, inject, input, OnChanges} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {FeModel} from '../core/fe-model';

@Directive({
  selector: '[model][required]',
  exportAs: 'requiredValidator',
})
export class FeRequiredValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly required = input(true, {transform: booleanAttribute});
  readonly required$ = toObservable(this.required);

  constructor() {
    this.model.addValidator(value => {
      if (!this.required()) {
        return;
      }
      if (value != null && value !== '') {
        return;
      }
      return {required: {value}};
    });
  }

  ngOnChanges() {
    this.model.updateValidity();
  }
}
