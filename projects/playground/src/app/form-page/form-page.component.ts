import { Component, OnInit, ViewChild } from '@angular/core';
import { FeGroupDirective } from 'ngfe';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit {
  @ViewChild('feForm1', {static: true}) feForm1!: FeGroupDirective;

  model1 = '';
  model2 = '321';

  constructor() {
  }

  ngOnInit(): void {
    this.feForm1.change$.subscribe(() => {
      console.log('feForm1 change', this.model1, this.model2);
    });
  }

  submit() {

  }
}
