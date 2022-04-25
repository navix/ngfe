import { NgModule } from '@angular/core';
import { FeErrDirective } from './fe-err.directive';

@NgModule({
  declarations: [
    FeErrDirective,
  ],
  exports: [
    FeErrDirective,
  ],
})
export class FeErrModule {
}
