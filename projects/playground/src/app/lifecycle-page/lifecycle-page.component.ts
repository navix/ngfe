import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lifecycle-page',
  templateUrl: './lifecycle-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifecyclePageComponent {
  value1?:string = '123';
  show1 = true;
  value2 = '';
  value3 = '';
}
