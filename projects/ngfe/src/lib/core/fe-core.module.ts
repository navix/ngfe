import { NgModule } from '@angular/core';
import { FeControlDirective } from './fe-control.directive';
import { FeGroupDirective } from './fe-group.directive';
import { FeButtonSubmitDirective, FeFormSubmitDirective } from './fe-submit.directive';
import { FeEnsureDirective } from './fe-ensure.directive';

@NgModule({
  declarations: [
    FeControlDirective,
    FeEnsureDirective,
    FeGroupDirective,
    FeButtonSubmitDirective,
    FeFormSubmitDirective,
  ],
  exports: [
    FeControlDirective,
    FeEnsureDirective,
    FeGroupDirective,
    FeButtonSubmitDirective,
    FeFormSubmitDirective,
  ],
})
export class FeCoreModule {
}
