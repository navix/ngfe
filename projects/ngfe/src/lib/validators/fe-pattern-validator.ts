import {computed, Directive, inject, input, OnChanges} from '@angular/core';
import {FeModel} from '../core/fe-model';

@Directive({
  selector: '[model][pattern]',
  exportAs: 'patternValidator',
})
export class FePatternValidator implements OnChanges {
  readonly model = inject(FeModel, {self: true});

  readonly pattern = input<string | RegExp | false>();

  readonly regex = computed<RegExp | undefined>(() => {
    const pattern = this.pattern();
    if (!pattern) {
      return undefined;
    }
    if (typeof pattern === 'string') {
      let regexStr = '';
      if (pattern.charAt(0) !== '^') regexStr += '^';
      regexStr += pattern;
      if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
      return new RegExp(regexStr);
    } else {
      return pattern;
    }
  });
  readonly regexStr = computed<string | undefined>(() => {
    const pattern = this.pattern();
    if (!pattern) {
      return undefined;
    }
    if (typeof pattern === 'string') {
      let regexStr = '';
      if (pattern.charAt(0) !== '^') regexStr += '^';
      regexStr += pattern;
      if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
      return regexStr;
    } else {
      return pattern.toString();
    }
  });

  constructor() {
    this.model.addValidator(value => {
      const regex = this.regex();
      const regexStr = this.regexStr();
      if (!regex || !regexStr || !value) {
        return undefined;
      }
      return regex.test(value) ? undefined : {pattern: {pattern: regexStr, value}};
    });
  }

  ngOnChanges() {
    this.model.updateValidity();
  }
}
