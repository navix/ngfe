import { Component, OnInit } from '@angular/core';
import { FeValidator } from 'ngfe';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.scss'],
})
export class ModelPageComponent implements OnInit {
  form = {
    inputText: '',
    inputText2: 'HELLOW',
    inputText3: undefined,
    textarea: 'TXTARR',
    checkbox1: false,
    checkbox2: true,
    radio1: 'one',
    radio2: '2',
    radio3: undefined,
    select1: 'two',
    select2: undefined,
  };

  form2 = {
    text1: '',
    text2: '',
    text3: '',
    text3_req: false,
    text4: '',
  };

  form3 = {
    text1: '',
    text2: '',
    text3: '',
  };

  text4validator: FeValidator<string> = ({value}) => {
    return value === 'MEH' ? {text4: true} : undefined;
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    alert('SUBM');
  }
}
