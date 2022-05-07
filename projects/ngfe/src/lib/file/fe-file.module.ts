import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeFileHolder } from './fe-file-holder.directive';
import { FeFile } from './fe-file.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FeFile,
    FeFileHolder,
  ],
  exports: [
    FeFile,
    FeFileHolder,
  ],
})
export class FeFileModule {
}
