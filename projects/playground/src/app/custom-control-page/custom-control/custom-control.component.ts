import { Component } from '@angular/core';
import { FeControl } from 'ngfe';

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss'],
  providers: [
    FeControl,
  ],
})
export class CustomControlComponent {
  constructor(
    public control: FeControl,
  ) {
  }

  get viewValue() {
    return this.control.modelValue;
  }

  input(value: string) {
    if (value === '123' || value === '') {
      this.control.input(value);
    }
  }
}
