import { NgModule } from '@angular/core';
import { FeControlsModule } from './controls';
import { FeCoreModule } from './core';
import { FeValidatorsModule } from './validators';

@NgModule({
  imports: [
    FeCoreModule,
    FeControlsModule,
    FeValidatorsModule,
  ],
  exports: [
    FeCoreModule,
    FeControlsModule,
    FeValidatorsModule,
  ],
})
export class FeModule {
}
