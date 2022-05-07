import { NgModule } from '@angular/core';
import { FeForm } from './fe-form.directive';
import { FeModel } from './fe-model.directive';
import { FeButtonSubmitDirective, FeFormSubmit } from './fe-submit.directive';

@NgModule({
  declarations: [
    FeModel,
    FeForm,
    FeButtonSubmitDirective,
    FeFormSubmit,
  ],
  exports: [
    FeModel,
    FeForm,
    FeButtonSubmitDirective,
    FeFormSubmit,
  ],
})
export class FeModelModule {
}
