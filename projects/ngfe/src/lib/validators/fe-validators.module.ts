import { NgModule } from '@angular/core';
import { FeEmailValidatorDirective } from './fe-email-validator.directive';
import { FeEqualValidatorDirective } from './fe-equal-validator.directive';
import { FeIsNumberValidatorDirective } from './fe-is-number-validator.directive';
import { FeLengthValidatorDirective } from './fe-length-validator.directive';
import { FeNotEqualValidatorDirective } from './fe-not-equal-validator.directive';
import { FeNumberValidatorDirective } from './fe-number-validator.directive';
import { FePatternValidatorDirective } from './fe-pattern-validator.directive';
import { FeRequiredValidatorDirective } from './fe-required-validator.directive';

@NgModule({
  declarations: [
    FeEmailValidatorDirective,
    FeEqualValidatorDirective,
    FeIsNumberValidatorDirective,
    FeLengthValidatorDirective,
    FeNotEqualValidatorDirective,
    FeNumberValidatorDirective,
    FePatternValidatorDirective,
    FeRequiredValidatorDirective,
  ],
  exports: [
    FeEmailValidatorDirective,
    FeEqualValidatorDirective,
    FeIsNumberValidatorDirective,
    FeLengthValidatorDirective,
    FeNotEqualValidatorDirective,
    FeNumberValidatorDirective,
    FePatternValidatorDirective,
    FeRequiredValidatorDirective,
  ],
})
export class FeValidatorsModule {
}
