import { Component } from '@angular/core';

@Component({
  selector: 'app-adapters-page',
  templateUrl: './adapters-page.component.html',
})
export class AdaptersPageComponent {
  value1 = [1, 2, 3];
  value1dc = false;
  value2 = 222;
  value3 = new Date('2022-02-24');
  value4 = new Date('2022-02-24T04:00:00.000Z');
}
