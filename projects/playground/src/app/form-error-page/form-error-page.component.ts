import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-error-page',
  templateUrl: './form-error-page.component.html',
  styleUrls: ['./form-error-page.component.scss']
})
export class FormErrorPageComponent implements OnInit {
  ev1 = '123';
  ev2 = '';
  ev3 = '';
  ev4 = '';
  ev5 = '';

  evv1() {
    return {
      evErr: true,
    };
  }

  constructor() { }

  ngOnInit(): void {
  }

}
