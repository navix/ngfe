import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeInputTextDirective } from './controls/input/fe-input-text.directive';
import { FeModel } from './fe-model.directive';
import { FeInputCheckboxDirective } from './controls/input/fe-input-checkbox.directive';
import { FeInputRadioDirective } from './controls/input/fe-input-radio.directive';
import { FeSelectDirective } from './controls/select/fe-select.directive';
import { RequiredValidatorDirective } from './validators/required-validator.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FeModel,
    FeInputTextDirective,
    FeInputCheckboxDirective,
    FeInputRadioDirective,
    FeSelectDirective,
    RequiredValidatorDirective,
  ],
  exports: [
    FeModel,
    FeInputTextDirective,
    FeInputCheckboxDirective,
    FeInputRadioDirective,
    FeSelectDirective,
    RequiredValidatorDirective,
  ],
})
export class FeModelModule {
}
