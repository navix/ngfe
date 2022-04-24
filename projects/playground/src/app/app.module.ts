import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FnValidatorModule, FormErrorModule, ValidationRefModule } from '@novyk/ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FnValidatorPageComponent } from './fn-validator-page/fn-validator-page.component';
import { FormErrorPageComponent } from './form-error-page/form-error-page.component';
import { DisplayErrorsComponent } from './form-error-page/display-errors/display-errors.component';
import { ErrorsPipe } from './form-error-page/errors.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FnValidatorPageComponent,
    FormErrorPageComponent,
    DisplayErrorsComponent,
    ErrorsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FnValidatorModule,
    ValidationRefModule,
    FormErrorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
