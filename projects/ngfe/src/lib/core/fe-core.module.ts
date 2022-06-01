import { NgModule } from '@angular/core';
import { FeControlDirective } from './fe-control.directive';
import { FeFormDirective } from './fe-form.directive';
import { FeIfDirective } from './fe-if.directive';
import { FeButtonSubmitDirective, FeFormSubmitDirective } from './fe-submit.directive';

@NgModule({
  declarations: [
    FeControlDirective,
    FeFormDirective,
    FeButtonSubmitDirective,
    FeIfDirective,
    FeFormSubmitDirective,
  ],
  exports: [
    FeControlDirective,
    FeFormDirective,
    FeButtonSubmitDirective,
    FeIfDirective,
    FeFormSubmitDirective,
  ],
})
export class FeCoreModule {
}
