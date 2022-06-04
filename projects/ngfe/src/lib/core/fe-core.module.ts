import { NgModule } from '@angular/core';
import { FeControl } from './fe-control';
import { FeForm } from './fe-form';
import { FeIf } from './fe-if';
import { FeFormSubmit, FeSubmit } from './fe-submit';

@NgModule({
  imports: [
    FeControl,
    FeIf,
    FeForm,
    FeFormSubmit,
    FeSubmit,
  ],
  exports: [
    FeControl,
    FeIf,
    FeForm,
    FeFormSubmit,
    FeSubmit,
  ],
})
export class FeCoreModule {
}
