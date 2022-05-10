import { Component } from '@angular/core';

@Component({
  selector: 'app-lifecycle-page',
  templateUrl: './lifecycle-page.component.html',
  styleUrls: ['./lifecycle-page.component.scss'],
})
export class LifecyclePageComponent {
  show1 = true;

  val1?: string = '123';
}
