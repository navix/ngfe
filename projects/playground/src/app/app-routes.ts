import {Routes} from '@angular/router';
import {AdaptersPage} from './pages/adapters-page/adapters-page';
import {CustomControlPage} from './pages/custom-control-page/custom-control-page';
import {DemoFormFieldPage} from './pages/demo-form-field-page/demo-form-field-page';
import {DemoRegistrationFormPage} from './pages/demo-registration-form-page/demo-registration-form-page';
import {DisabledPage} from './pages/disabled-page/disabled-page';
import {FormPage} from './pages/form-page/form-page';
import {InputControlPage} from './pages/input-control-page/input-control-page';
import {LifecyclePage} from './pages/lifecycle-page/lifecycle-page';
import {SelectControlPage} from './pages/select-control-page/select-control-page';
import {SubFormPage} from './pages/sub-form-page/sub-form-page';
import {ValidationPage} from './pages/validation-page/validation-page';

const routes: Routes = [
  {
    path: 'input-control',
    component: InputControlPage,
  },
  {
    path: 'select-control',
    component: SelectControlPage,
  },
  {
    path: 'validation',
    component: ValidationPage,
  },
  {
    path: 'adapters',
    component: AdaptersPage,
  },
  {
    path: 'disabled',
    component: DisabledPage,
  },
  {
    path: 'form',
    component: FormPage,
  },
  {
    path: 'lifecycle',
    component: LifecyclePage,
  },
  {
    path: 'sub-form',
    component: SubFormPage,
  },
  {
    path: 'custom-control',
    component: CustomControlPage,
  },
  // Demos
  {
    path: 'demo-registration-form',
    component: DemoRegistrationFormPage,
  },
  {
    path: 'demo-form-field',
    component: DemoFormFieldPage,
  },
];

export default routes;
