import { NgModule } from '@angular/core';
import { FeNgAdapterDirective } from './fe-ng-adapter.directive';

@NgModule({
  declarations: [
    FeNgAdapterDirective,
  ],
  exports: [
    FeNgAdapterDirective,
  ],
})
export class FeNgAdapterModule {
}
