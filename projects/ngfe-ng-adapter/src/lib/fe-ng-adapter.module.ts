import { NgModule } from '@angular/core';
import { FeNgAdapter } from './fe-ng-adapter';
import { FeNgControl } from './fe-ng-control';

@NgModule({
  declarations: [
    FeNgAdapter,
    FeNgControl,
  ],
  exports: [
    FeNgAdapter,
    FeNgControl,
  ],
})
export class FeNgAdapterModule {
}
