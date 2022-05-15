import { NgModule } from '@angular/core';
import { FeRequiredValidatorDirective } from './fe-required-validator.directive';

@NgModule({
  declarations: [
    FeRequiredValidatorDirective,
  ],
  exports: [
    FeRequiredValidatorDirective,
  ],
})
export class FeValidatorsModule {
}
