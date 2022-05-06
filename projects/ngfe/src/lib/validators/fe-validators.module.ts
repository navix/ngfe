import { NgModule } from '@angular/core';
import { RequiredValidator } from './fe-required-validator.directive';

@NgModule({
  declarations: [
    RequiredValidator,
  ],
  exports: [
    RequiredValidator,
  ],
})
export class FeValidatorsModule {
}
