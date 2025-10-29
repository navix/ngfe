import {booleanAttribute, Directive, inject, input, OnChanges} from '@angular/core';
import {FeModel} from '../core/fe-model';

@Directive({
  selector: '[model][notEqual]',
  exportAs: 'notEqualValidator',
})
export class FeNotEqualValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly notEqual = input<any>();
  readonly activeWhenEmpty = input(false, {transform: booleanAttribute});

  constructor() {
    this.model.addValidator(value => {
      if (!value && !this.activeWhenEmpty()) {
        return undefined;
      }
      if (this.notEqual() === value) {
        return {
          notEqual: {
            notEqual: this.notEqual(),
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
