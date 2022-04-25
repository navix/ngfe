import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeFileHolderDirective } from './fe-file-holder.directive';
import { FeFileComponent } from './fe-file.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FeFileComponent,
    FeFileHolderDirective,
  ],
  exports: [
    FeFileComponent,
    FeFileHolderDirective,
  ],
})
export class FeFileModule {
}
