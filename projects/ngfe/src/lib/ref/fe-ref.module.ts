import { NgModule } from '@angular/core';
import { FeRefDirective } from './fe-ref.directive';

@NgModule({
  declarations: [
    FeRefDirective,
  ],
  exports: [
    FeRefDirective,
  ],
})
export class FeRefModule {
}
