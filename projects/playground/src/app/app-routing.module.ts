import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePageComponent } from './file-page/file-page.component';
import { ModelPageComponent } from './model-page/model-page.component';

const routes: Routes = [
  {
    path: 'file',
    component: FilePageComponent,
  },
  {
    path: 'model',
    component: ModelPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
