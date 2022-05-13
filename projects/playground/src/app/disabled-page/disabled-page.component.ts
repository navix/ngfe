import { Component } from '@angular/core';

@Component({
  selector: 'app-disabled-page',
  templateUrl: './disabled-page.component.html',
  styleUrls: ['./disabled-page.component.scss'],
})
export class DisabledPageComponent {
  model1 = '';
  model1disabled = false;
}
