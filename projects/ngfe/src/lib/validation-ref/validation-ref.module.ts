import { NgModule } from '@angular/core';
import { ValidationRefDirective } from './validation-ref.directive';

@NgModule({
  declarations: [
    ValidationRefDirective,
  ],
  exports: [
    ValidationRefDirective,
  ],
})
export class ValidationRefModule {
}
