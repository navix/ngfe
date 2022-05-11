import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FeModule } from 'ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilePageComponent } from './file-page/file-page.component';
import { FieldComponent } from './model-page/field/field.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { TextPageComponent } from './text-page/text-page.component';
import { NumberPageComponent } from './number-page/number-page.component';
import { ValidatorsPageComponent } from './validators-page/validators-page.component';
import { LifecyclePageComponent } from './lifecycle-page/lifecycle-page.component';
import { SelectPageComponent } from './select-page/select-page.component';
import { CheckboxPageComponent } from './checkbox-page/checkbox-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FilePageComponent,
    ModelPageComponent,
    FieldComponent,
    TextPageComponent,
    NumberPageComponent,
    ValidatorsPageComponent,
    LifecyclePageComponent,
    SelectPageComponent,
    CheckboxPageComponent,
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
