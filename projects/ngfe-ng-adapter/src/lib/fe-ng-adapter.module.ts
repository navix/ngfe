import { NgModule } from '@angular/core';
import { FeNgAdapterDirective } from './fe-ng-adapter.directive';
import { FeNgControlDirective } from './fe-ng-control.directive';

@NgModule({
  declarations: [
    FeNgAdapterDirective,
    FeNgControlDirective,
  ],
  exports: [
    FeNgAdapterDirective,
    FeNgControlDirective,
  ],
})
export class FeNgAdapterModule {
}
