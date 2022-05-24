import { NgModule } from '@angular/core';
import { FeControlDirective } from './fe-control.directive';
import { FeFormDirective } from './fe-form.directive';
import { FeButtonSubmitDirective, FeFormSubmitDirective } from './fe-submit.directive';
import { FeEnsureDirective } from './fe-ensure.directive';

@NgModule({
  declarations: [
    FeControlDirective,
    FeEnsureDirective,
    FeFormDirective,
    FeButtonSubmitDirective,
    FeFormSubmitDirective,
  ],
  exports: [
    FeControlDirective,
    FeEnsureDirective,
    FeFormDirective,
    FeButtonSubmitDirective,
    FeFormSubmitDirective,
  ],
})
export class FeCoreModule {
}
