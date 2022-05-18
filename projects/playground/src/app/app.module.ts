import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeModule } from 'ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckboxPageComponent } from './checkbox-page/checkbox-page.component';
import { CustomControlPageComponent } from './custom-control-page/custom-control-page.component';
import { CustomControlComponent } from './custom-control-page/custom-control/custom-control.component';
import { DisabledPageComponent } from './disabled-page/disabled-page.component';
import { FieldComponent } from './field-page/custom-field/field.component';
import { FieldPageComponent } from './field-page/field-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { InputControlPageComponent } from './input-control-page/input-control-page.component';
import { LifecyclePageComponent } from './lifecycle-page/lifecycle-page.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { NumberPageComponent } from './number-page/number-page.component';
import { RadioPageComponent } from './radio-page/radio-page.component';
import { SelectControlPageComponent } from './select-control-page/select-control-page.component';
import { ValidatorsPageComponent } from './validators-page/validators-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelPageComponent,
    FieldComponent,
    InputControlPageComponent,
    NumberPageComponent,
    ValidatorsPageComponent,
    LifecyclePageComponent,
    SelectControlPageComponent,
    CheckboxPageComponent,
    RadioPageComponent,
    FieldPageComponent,
    FormPageComponent,
    DisabledPageComponent,
    CustomControlPageComponent,
    CustomControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
