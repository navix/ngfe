import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  model1 = '';
  model2 = '';
  model3 = '';
  model4 = new Date('2022-02-24');

  get model4type() {
    return typeof this.model4;
  }
}
