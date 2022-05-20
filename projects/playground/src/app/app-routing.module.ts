import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdaptersPageComponent } from './adapters-page/adapters-page.component';
import { CustomControlPageComponent } from './custom-control-page/custom-control-page.component';
import { DisabledPageComponent } from './disabled-page/disabled-page.component';
import { FieldPageComponent } from './field-page/field-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { InputControlPageComponent } from './input-control-page/input-control-page.component';
import { LifecyclePageComponent } from './lifecycle-page/lifecycle-page.component';
import { SelectControlPageComponent } from './select-control-page/select-control-page.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';

const routes: Routes = [
  {
    path: 'input-control',
    component: InputControlPageComponent,
  },
  {
    path: 'select-control',
    component: SelectControlPageComponent,
  },
  {
    path: 'validation',
    component: ValidationPageComponent,
  },
  {
    path: 'adapters',
    component: AdaptersPageComponent,
  },
  {
    path: 'lifecycle',
    component: LifecyclePageComponent,
  },
  {
    path: 'field',
    component: FieldPageComponent,
  },
  {
    path: 'form',
    component: FormPageComponent,
  },
  {
    path: 'disabled',
    component: DisabledPageComponent,
  },
  {
    path: 'custom-control',
    component: CustomControlPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
