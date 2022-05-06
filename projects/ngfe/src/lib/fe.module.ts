import { NgModule } from '@angular/core';
import { FeDestroyModule } from './destroy';
import { FeErrModule } from './err';
import { FeFileModule } from './file';
import { FeFnValidatorModule } from './fn-validator';
import { FeModelModule } from './model';
import { FeRefModule } from './ref';
import { FeSubmitModule } from './submit';

@NgModule({
  imports: [
    FeDestroyModule,
    FeErrModule,
    FeFileModule,
    FeFnValidatorModule,
    FeModelModule,
    FeRefModule,
    FeSubmitModule,
  ],
  exports: [
    FeDestroyModule,
    FeErrModule,
    FeFileModule,
    FeFnValidatorModule,
    FeModelModule,
    FeRefModule,
    FeSubmitModule,
  ],
})
export class FeModule {
}
