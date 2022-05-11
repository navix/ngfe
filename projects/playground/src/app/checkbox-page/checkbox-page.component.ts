import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html',
  styleUrls: ['./checkbox-page.component.scss'],
})
export class CheckboxPageComponent {
  model1 = false;

  model2 = true;

  model3?: boolean;
}
