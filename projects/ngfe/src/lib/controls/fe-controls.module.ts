import { NgModule } from '@angular/core';
import { FeInputCheckbox } from './input/fe-input-checkbox.directive';
import { FeInputRadio } from './input/fe-input-radio.directive';
import { FeInputText } from './input/fe-input-text.directive';
import { FeSelect } from './select/fe-select.directive';

@NgModule({
  declarations: [
    FeInputText,
    FeInputCheckbox,
    FeInputRadio,
    FeSelect,
  ],
  exports: [
    FeInputText,
    FeInputCheckbox,
    FeInputRadio,
    FeSelect,
  ],
})
export class FeControlsModule {
}
