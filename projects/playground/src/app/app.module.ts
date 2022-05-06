import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  FeDestroyModule,
  FeErrModule,
  FeFileModule,
  FeFnValidatorModule, FeModule,
  FeRefModule,
  FeSubmitModule,
} from '@novyk/ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestroyPageComponent } from './destroy-page/destroy-page.component';
import { FilePageComponent } from './file-page/file-page.component';
import { FnValidatorPageComponent } from './fn-validator-page/fn-validator-page.component';
import { DisplayErrorsComponent } from './form-error-page/display-errors/display-errors.component';
import { ErrorsPipe } from './form-error-page/errors.pipe';
import { FormErrorPageComponent } from './form-error-page/form-error-page.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { FieldComponent } from './model-page/field/field.component';

@NgModule({
  declarations: [
    AppComponent,
    FnValidatorPageComponent,
    FormErrorPageComponent,
    DisplayErrorsComponent,
    ErrorsPipe,
    SubmitPageComponent,
    FilePageComponent,
    DestroyPageComponent,
    ModelPageComponent,
    FieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
