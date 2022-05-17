import { Component } from '@angular/core';

@Component({
  selector: 'app-lifecycle-page',
  templateUrl: './lifecycle-page.component.html',
  styleUrls: ['./lifecycle-page.component.scss'],
})
export class LifecyclePageComponent {
  show1 = true;

  val1?: string = '123';
  model2 = '';

  value1 = '1';
  text1touched = false;
  text1disabled = false;
  value2 = '';
  value3 = '';

  statech($event: any) {
    console.log('STATE_CH', $event);
  }

  itstouched(touched: boolean) {
    alert('ITS TOCUHJED');
  }
}
