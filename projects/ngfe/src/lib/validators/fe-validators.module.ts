import { NgModule } from '@angular/core';
import { FeEmailValidator } from './fe-email-validator';
import { FeEqualValidator } from './fe-equal-validator';
import { FeIsNumberValidator } from './fe-is-number-validator';
import { FeLengthValidator } from './fe-length-validator';
import { FeNotEqualValidator } from './fe-not-equal-validator';
import { FeNumberValidator } from './fe-number-validator';
import { FePatternValidator } from './fe-pattern-validator';
import { FeRequiredValidator } from './fe-required-validator';

@NgModule({
  imports: [
    FeEmailValidator,
    FeEqualValidator,
    FeIsNumberValidator,
    FeLengthValidator,
    FeNotEqualValidator,
    FeNumberValidator,
    FePatternValidator,
    FeRequiredValidator,
  ],
  exports: [
    FeEmailValidator,
    FeEqualValidator,
    FeIsNumberValidator,
    FeLengthValidator,
    FeNotEqualValidator,
    FeNumberValidator,
    FePatternValidator,
    FeRequiredValidator,
  ],
})
export class FeValidatorsModule {
}
