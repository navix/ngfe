import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxPageComponent } from './checkbox-page/checkbox-page.component';
import { CustomControlPageComponent } from './custom-control-page/custom-control-page.component';
import { DisabledPageComponent } from './disabled-page/disabled-page.component';
import { FieldPageComponent } from './field-page/field-page.component';
import { FilePageComponent } from './file-page/file-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { LifecyclePageComponent } from './lifecycle-page/lifecycle-page.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { NumberPageComponent } from './number-page/number-page.component';
import { RadioPageComponent } from './radio-page/radio-page.component';
import { SelectControlPageComponent } from './select-control-page/select-control-page.component';
import { InputControlPageComponent } from './input-control-page/input-control-page.component';
import { ValidatorsPageComponent } from './validators-page/validators-page.component';

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
    path: 'file',
    component: FilePageComponent,
  },
  {
    path: 'model',
    component: ModelPageComponent,
  },
  {
    path: 'number',
    component: NumberPageComponent,
  },
  {
    path: 'validators',
    component: ValidatorsPageComponent,
  },
  {
    path: 'lifecycle',
    component: LifecyclePageComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxPageComponent,
  },
  {
    path: 'radio',
    component: RadioPageComponent,
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
