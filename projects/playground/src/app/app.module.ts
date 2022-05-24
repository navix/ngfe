import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeModule } from 'ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomControlPageComponent } from './demos/custom-control-page/custom-control-page.component';
import { CustomControlComponent } from './demos/custom-control-page/custom-control/custom-control.component';
import { DisabledPageComponent } from './disabled-page/disabled-page.component';
import { FieldComponent } from './demos/field-page/custom-field/field.component';
import { FieldPageComponent } from './demos/field-page/field-page.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { InputControlPageComponent } from './input-control-page/input-control-page.component';
import { LifecyclePageComponent } from './lifecycle-page/lifecycle-page.component';
import { SelectControlPageComponent } from './select-control-page/select-control-page.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';
import { AdaptersPageComponent } from './adapters-page/adapters-page.component';
import { DynamicFormComponent } from './demos/dynamic-form-page/dynamic-form.component';
import { SubFormPageComponent } from './demos/sub-form-page/sub-form-page.component';
import { SubFormComponent } from './demos/sub-form-page/sub-form/sub-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    InputControlPageComponent,
    ValidationPageComponent,
    LifecyclePageComponent,
    SelectControlPageComponent,
    FieldPageComponent,
    GroupPageComponent,
    DisabledPageComponent,
    CustomControlPageComponent,
    CustomControlComponent,
    AdaptersPageComponent,
    DynamicFormComponent,
    SubFormPageComponent,
    SubFormComponent,
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
