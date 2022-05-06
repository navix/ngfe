import { NgModule } from '@angular/core';
import { FeControlsModule } from './controls';
import { FeFileModule } from './file';
import { FeModelModule } from './model';
import { FeValidatorsModule } from './validators';

@NgModule({
  imports: [
    FeControlsModule,
    FeFileModule,
    FeModelModule,
    FeValidatorsModule,
  ],
  exports: [
    FeControlsModule,
    FeFileModule,
    FeModelModule,
    FeValidatorsModule,
  ],
})
export class FeModule {
}
