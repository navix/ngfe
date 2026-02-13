import {booleanAttribute, Directive, inject, input, OnChanges} from '@angular/core';
import {FeModel} from '../core/fe-model';

@Directive({
  selector: '[model][equal]',
  exportAs: 'equalValidator',
})
export class FeEqualValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly equal = input<any>();
  readonly activeWhenEmpty = input(false, {transform: booleanAttribute});

  constructor() {
    this.model.addValidator(value => {
      if (!value && !this.activeWhenEmpty()) {
        return undefined;
      }
      if (this.equal() !== value) {
        return {
          equal: {
            equal: this.equal(),
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
