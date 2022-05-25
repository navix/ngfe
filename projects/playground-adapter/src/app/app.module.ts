import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FeModule } from 'ngfe';
import { FeNgAdapterModule } from 'ngfe-ng-adapter';
import { AppComponent } from './app.component';
import { CustomNgVaComponent } from './custom-ng-va/custom-ng-va.component';
import { CustomNgValidatorDirective } from './custom-ng-va/custom-ng-validator.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FeModule,
    FeNgAdapterModule
  ],
  declarations: [
    AppComponent,
    CustomNgVaComponent,
    CustomNgValidatorDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
