import { NgModule } from '@angular/core';
import { FeControl } from './fe-control';
import { FeForm } from './fe-form';
import { FeIf } from './fe-if';
import { FeFormSubmit, FeSubmit } from './fe-submit';

@NgModule({
  declarations: [
    FeControl,
    FeForm,
    FeSubmit,
    FeIf,
    FeFormSubmit,
  ],
  exports: [
    FeControl,
    FeForm,
    FeSubmit,
    FeIf,
    FeFormSubmit,
  ],
})
export class FeCoreModule {
}
