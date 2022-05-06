import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FeModule } from '@novyk/ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilePageComponent } from './file-page/file-page.component';
import { FieldComponent } from './model-page/field/field.component';
import { ModelPageComponent } from './model-page/model-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FilePageComponent,
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
