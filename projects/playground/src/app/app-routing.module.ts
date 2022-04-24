import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FnValidatorPageComponent } from './fn-validator-page/fn-validator-page.component';
import { FormErrorPageComponent } from './form-error-page/form-error-page.component';

const routes: Routes = [
  {
    path: 'fn-validator',
    component: FnValidatorPageComponent,
  },
  {
    path: 'form-error',
    component: FormErrorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
