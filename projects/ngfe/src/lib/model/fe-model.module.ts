import { NgModule } from '@angular/core';
import { FeForm } from './fe-form.directive';
import { FeModel } from './fe-model.directive';
import { FeButtonSubmitDirective, FeFormSubmit } from './fe-submit.directive';
import { FeField } from './fe-field.directive';

@NgModule({
  declarations: [
    FeModel,
    FeForm,
    FeButtonSubmitDirective,
    FeFormSubmit,
    FeField,
  ],
  exports: [
    FeModel,
    FeForm,
    FeButtonSubmitDirective,
    FeFormSubmit,
    FeField,
  ],
})
export class FeModelModule {
}
