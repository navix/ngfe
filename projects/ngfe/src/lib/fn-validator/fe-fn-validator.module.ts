import { NgModule } from '@angular/core';
import { FeFnValidatorDirective } from './fe-fn-validator.directive';

@NgModule({
  declarations: [
    FeFnValidatorDirective,
  ],
  exports: [
    FeFnValidatorDirective,
  ],
})
export class FeFnValidatorModule {
}
