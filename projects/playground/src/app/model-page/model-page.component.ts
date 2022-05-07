import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeModelValidator } from '../../../../ngfe/src/lib/model';

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
    radio2: 2,
    radio3: 2,
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

  text4validator: FeModelValidator<string> = {
    name: 't4v',
    validator: ({value}) => {
      return value.value === 'MEH';
    },
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    alert('SUBM');
  }
}
