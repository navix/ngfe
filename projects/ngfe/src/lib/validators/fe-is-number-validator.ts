import {booleanAttribute, Directive, inject, input, OnChanges} from '@angular/core';
import {FeModel} from '../core/fe-model';
import {ensureNumber} from '../util/ensure-number';

@Directive({
  selector: '[model][isNumber]',
  exportAs: 'isNumberValidator',
})
export class FeIsNumberValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly isNumber = input(true, {transform: booleanAttribute});

  constructor() {
    this.model.addValidator(value => {
      if (!this.isNumber()) {
        return undefined;
      }
      if (value == null || value === '') {
        return undefined;
      }
      const numberValue = ensureNumber(value);
      if (numberValue === undefined) {
        return {
          isNumber: {
            value,
          },
        };
      }
      return undefined;
    });
  }

  ngOnChanges() {
    this.model.updateValidity();
  }
}
