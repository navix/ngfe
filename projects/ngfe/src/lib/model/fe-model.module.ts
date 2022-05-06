import { NgModule } from '@angular/core';
import { FeForm } from './fe-form.directive';
import { FeModel } from './fe-model.directive';
import { FeButtonSubmit, FeFormSubmit } from './fe-submit.directive';

@NgModule({
  declarations: [
    FeModel,
    FeForm,
    FeButtonSubmit,
    FeFormSubmit,
  ],
  exports: [
    FeModel,
    FeForm,
    FeButtonSubmit,
    FeFormSubmit,
  ],
})
export class FeModelModule {
}
