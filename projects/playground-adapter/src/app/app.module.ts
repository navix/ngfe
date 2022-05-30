import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
    FeNgAdapterModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
