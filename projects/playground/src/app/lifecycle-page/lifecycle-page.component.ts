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
  value4?: string;
  show4 = true;
  force4 = true;
  ensureCount4 = 0;

  ensureChange4(v: any) {
    this.ensureCount4++;
  }

  setValue4Undef() {
    this.value4 = undefined;
  }
}
