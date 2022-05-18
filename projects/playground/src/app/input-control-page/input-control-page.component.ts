import { Component } from '@angular/core';

@Component({
  selector: 'app-input-control-page',
  templateUrl: './input-control-page.component.html',
})
export class InputControlPageComponent {
  value1 = '';
  value2 = '123';
  value3?: string;
  value4 = 111;
  value5 = 111;
  value6 = 666;
  value7 = false;
  value8 = true;
  value9?: boolean;
  value10 = '1';
  value11 = '1';
  value12?: string;
  value13 = 1;
  value14 = '2022-02-24';
  value15 = new Date('2022-03-03');
  value16 = '2022-02-24T05:00';
  value17 = new Date('2022-08-24T18:00');
  value18?: any;
}
