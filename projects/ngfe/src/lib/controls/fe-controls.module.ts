import { NgModule } from '@angular/core';
import { FeCheckbox } from './fe-checkbox.directive';
import { FeDate } from './fe-date.directive';
import { FeNumber } from './fe-number.directive';
import { FeRadio } from './fe-radio.directive';
import { FeText } from './fe-text.directive';
import { FeSelect, FeSelectOption } from './fe-select.directive';

@NgModule({
  declarations: [
    FeCheckbox,
    FeDate,
    FeNumber,
    FeRadio,
    FeText,
    FeSelect,
    FeSelectOption,
  ],
  exports: [
    FeCheckbox,
    FeDate,
    FeNumber,
    FeRadio,
    FeText,
    FeSelect,
    FeSelectOption,
  ],
})
export class FeControlsModule {
}