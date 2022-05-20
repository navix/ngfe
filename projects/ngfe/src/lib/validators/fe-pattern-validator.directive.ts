import { Directive, Input, OnChanges, Self } from '@angular/core';
import { FeControl, FeValidator } from '../core';

@Directive({
  selector: '[feControl][pattern]',
})
export class FePatternValidatorDirective implements OnChanges {
  @Input() pattern?: string | RegExp | false;

  validator: FeValidator<string> = ({modelValue}) => {
    if (!this.regex || !this.regexStr || !modelValue) {
      return undefined;
    }
    return this.regex.test(modelValue)
      ? undefined
      : {pattern: {pattern: this.regexStr, modelValue}};
  };

  private regex?: RegExp;
  private regexStr?: string;

  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.updateValidators({add: [this.validator]});
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
