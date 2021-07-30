import { NgModule } from '@angular/core';
import { FormErrorDirective } from './form-error.directive';

@NgModule({
  declarations: [
    FormErrorDirective,
  ],
  exports: [
    FormErrorDirective,
  ],
})
export class FormErrorModule {
}
