import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestroyPageComponent } from './destroy-page/destroy-page.component';
import { FilePageComponent } from './file-page/file-page.component';
import { FnValidatorPageComponent } from './fn-validator-page/fn-validator-page.component';
import { FormErrorPageComponent } from './form-error-page/form-error-page.component';
import { SubmitPageComponent } from './submit-page/submit-page.component';

const routes: Routes = [
  {
    path: 'fn-validator',
    component: FnValidatorPageComponent,
  },
  {
    path: 'form-error',
    component: FormErrorPageComponent,
  },
  {
    path: 'submit',
    component: SubmitPageComponent,
  },
  {
    path: 'file',
    component: FilePageComponent,
  },
  {
    path: 'destroy',
    component: DestroyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
