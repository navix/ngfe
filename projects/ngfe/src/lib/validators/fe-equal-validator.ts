import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: '[feControl][equal]',
  exportAs: 'feEqualValidator',
})
export class FeEqualValidator implements OnChanges {
  @Input() equal: any;

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.addValidator(({modelValue}) => {
      if (this.equal !== modelValue) {
        return {
          'equal': {
            equal: this.equal,
            modelValue,
          },
        };
      }
      return undefined;
    });
  }

  ngOnChanges() {
    this.control.updateValidity();
  }
}
