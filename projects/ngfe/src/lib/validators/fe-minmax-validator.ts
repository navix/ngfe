import {computed, Directive, inject, input, OnChanges} from '@angular/core';
import {FeModel} from '../core/fe-model';
import {ensureNumber} from '../util/ensure-number';

@Directive({
  selector: '[model][min],[model][max]',
  exportAs: 'minmaxValidator',
  standalone: true,
})
export class FeMinmaxValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly min = input<string | number | false>();
  readonly max = input<string | number | false>();

  readonly normalizedMin = computed(() => (this.min() != null ? +this.min()! : undefined));
  readonly normalizedMax = computed(() => (this.max() != null ? +this.max()! : undefined));

  constructor() {
    this.model.addValidator(value => {
      const numberValue = ensureNumber(value);
      if (numberValue === undefined) {
        return undefined;
      }
      const normalizedMin = this.normalizedMin();
      const normalizedMax = this.normalizedMax();
      if (normalizedMin !== undefined) {
        if (numberValue < normalizedMin) {
          return {
            min: {min: normalizedMin, value, numberValue},
          };
        }
      }
      if (normalizedMax !== undefined) {
        if (numberValue > normalizedMax) {
          return {
            max: {max: normalizedMax, value, numberValue},
          };
        }
      }
      return undefined;
    });
  }

  ngOnChanges() {
    this.model.updateValidity();
  }
}
