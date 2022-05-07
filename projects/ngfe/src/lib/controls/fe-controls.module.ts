import { NgModule } from '@angular/core';
import { FeInputCheckbox } from './input/fe-input-checkbox.directive';
import { FeInputDate } from './input/fe-input-date.directive';
import { FeInputRadio } from './input/fe-input-radio.directive';
import { FeInputText } from './input/fe-input-text.directive';
import { FeSelect, FeSelectOption } from './select/fe-select.directive';

@NgModule({
  declarations: [
    FeInputCheckbox,
    FeInputDate,
    FeInputRadio,
    FeInputText,
    FeSelect,
    FeSelectOption,
  ],
  exports: [
    FeInputCheckbox,
    FeInputDate,
    FeInputRadio,
    FeInputText,
    FeSelect,
    FeSelectOption,
  ],
})
export class FeControlsModule {
}
