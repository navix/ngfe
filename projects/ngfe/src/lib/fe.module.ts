import { NgModule } from '@angular/core';
import { FeValueAccessorsModule } from './value-accessors';
import { FeCoreModule } from './core';
import { FeValidatorsModule } from './validators';

@NgModule({
  imports: [
    FeCoreModule,
    FeValueAccessorsModule,
    FeValidatorsModule,
  ],
  exports: [
    FeCoreModule,
    FeValueAccessorsModule,
    FeValidatorsModule,
  ],
})
export class FeModule {
}
