import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FnValidatorModule, FormErrorModule, ValidationRefModule } from '@novyk/ngfe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrPipe } from './err.pipe';
import { RequiredErrComponent } from './required-err/required-err.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrPipe,
    RequiredErrComponent,
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
