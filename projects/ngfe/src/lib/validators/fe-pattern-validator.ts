import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: '[feControl][pattern]',
  exportAs: 'fePatternValidator',
  standalone: true,
})
export class FePatternValidator implements OnChanges {
  @Input() pattern?: string | RegExp | false;

  private regex?: RegExp;
  private regexStr?: string;

  constructor(
    @Self() private control: FeControl<string>,
  ) {
    this.control.addValidator(({modelValue}) => {
      if (!this.regex || !this.regexStr || !modelValue) {
        return undefined;
      }
      return this.regex.test(modelValue)
        ? undefined
        : {pattern: {pattern: this.regexStr, modelValue}};
    });
  }

  ngOnChanges() {
    const pattern = this.pattern;
    if (!pattern) {
      this.regex = undefined;
      this.regexStr = undefined;
      return;
    }

    if (typeof pattern === 'string') {
      let regexStr = '';
      if (pattern.charAt(0) !== '^') regexStr += '^';
      regexStr += pattern;
      if (pattern.charAt(pattern.length - 1) !== '$') regexStr += '$';
      this.regex = new RegExp(regexStr);
      this.regexStr = regexStr;
    } else {
      this.regex = pattern;
      this.regexStr = pattern.toString();
    }

    this.control.updateValidity();
  }
}
