import { NgModule } from '@angular/core';
import { FnValidatorDirective } from './fn-validator.directive';

@NgModule({
  declarations: [
    FnValidatorDirective,
  ],
  exports: [
    FnValidatorDirective,
  ],
})
export class FnValidatorModule {
}
