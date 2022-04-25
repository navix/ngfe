import { NgModule } from '@angular/core';
import { FeSubmitDirective } from './fe-submit.directive';

@NgModule({
  declarations: [
    FeSubmitDirective,
  ],
  exports: [
    FeSubmitDirective,
  ],
})
export class FeSubmitModule {
}
