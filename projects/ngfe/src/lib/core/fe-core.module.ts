import { NgModule } from '@angular/core';
import { FeControlDirective } from './fe-control.directive';
import { FeGroupDirective } from './fe-group.directive';
import { FeButtonSubmitDirective, FeFormSubmitDirective } from './fe-submit.directive';

@NgModule({
  declarations: [
    FeControlDirective,
    FeGroupDirective,
    FeButtonSubmitDirective,
    FeFormSubmitDirective,
  ],
  exports: [
    FeControlDirective,
    FeGroupDirective,
    FeButtonSubmitDirective,
    FeFormSubmitDirective,
  ],
})
export class FeCoreModule {
}
