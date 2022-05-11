import { Component } from '@angular/core';

@Component({
  selector: 'app-radio-page',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss'],
})
export class RadioPageComponent {
  model1 = 'VAL2';

  model2?: string;
}
