import { Component, OnInit, ViewChild } from '@angular/core';
import { FeForm } from 'ngfe';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit {
  @ViewChild('feForm1', {static: true}) feForm1!: FeForm;

  model1 = '';
  model2 = '321';

  constructor() {
  }

  ngOnInit(): void {
    this.feForm1.change$.subscribe(() => {
      console.log('feForm1 change');
    });
  }

  submit() {

  }
}
