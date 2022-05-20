import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeModule } from 'ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomControlPageComponent } from './custom-control-page/custom-control-page.component';
import { CustomControlComponent } from './custom-control-page/custom-control/custom-control.component';
import { DisabledPageComponent } from './disabled-page/disabled-page.component';
import { FieldComponent } from './field-page/custom-field/field.component';
import { FieldPageComponent } from './field-page/field-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { InputControlPageComponent } from './input-control-page/input-control-page.component';
import { LifecyclePageComponent } from './lifecycle-page/lifecycle-page.component';
import { SelectControlPageComponent } from './select-control-page/select-control-page.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';
import { AdaptersPageComponent } from './adapters-page/adapters-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    InputControlPageComponent,
    ValidationPageComponent,
    LifecyclePageComponent,
    SelectControlPageComponent,
    FieldPageComponent,
    FormPageComponent,
    DisabledPageComponent,
    CustomControlPageComponent,
    CustomControlComponent,
    AdaptersPageComponent,
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
