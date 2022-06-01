import { NgModule } from '@angular/core';
import { FeInputDirective } from './fe-input.directive';
import { FeSelectDirective, FeSelectOptionDirective } from './fe-select.directive';

@NgModule({
  declarations: [
    FeInputDirective,
    FeSelectDirective,
    FeSelectOptionDirective,
  ],
  exports: [
    FeInputDirective,
    FeSelectDirective,
    FeSelectOptionDirective,
  ],
})
export class FeValueAccessorsModule {
}
