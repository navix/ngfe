import { NgModule } from '@angular/core';
import { FeControlsModule } from './controls';
import { FeCoreModule } from './core';
import { FeFileModule } from './file';
import { FeValidatorsModule } from './validators';

@NgModule({
  imports: [
    FeCoreModule,
    FeControlsModule,
    FeFileModule,
    FeValidatorsModule,
  ],
  exports: [
    FeCoreModule,
    FeControlsModule,
    FeFileModule,
    FeValidatorsModule,
  ],
})
export class FeModule {
}
