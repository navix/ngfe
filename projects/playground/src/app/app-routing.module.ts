import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePageComponent } from './file-page/file-page.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { NumberPageComponent } from './number-page/number-page.component';
import { TextPageComponent } from './text-page/text-page.component';
import { ValidatorsPageComponent } from './validators-page/validators-page.component';

const routes: Routes = [
  {
    path: 'file',
    component: FilePageComponent,
  },
  {
    path: 'model',
    component: ModelPageComponent,
  },
  {
    path: 'text',
    component: TextPageComponent,
  },
  {
    path: 'number',
    component: NumberPageComponent,
  },
  {
    path: 'validators',
    component: ValidatorsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
