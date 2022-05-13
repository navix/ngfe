import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-field-page',
  templateUrl: './field-page.component.html',
  styleUrls: ['./field-page.component.scss']
})
export class FieldPageComponent implements OnInit {
  model1 = '';
  model2 = '';
  model3 = '';

  constructor() { }

  ngOnInit(): void {
  }

}
