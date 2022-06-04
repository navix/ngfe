import { NgModule } from '@angular/core';
import { FeInput } from './fe-input';
import { FeSelect, FeSelectOption } from './fe-select';

@NgModule({
  declarations: [
    FeInput,
    FeSelect,
    FeSelectOption,
  ],
  exports: [
    FeInput,
    FeSelect,
    FeSelectOption,
  ],
})
export class FeValueAccessorsModule {
}
