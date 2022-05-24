import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-form-page',
  templateUrl: './sub-form-page.component.html',
})
export class SubFormPageComponent {
  form: {
    field1: string;
    subForm: {
      subField1: string;
      subField2: number;
    }
  } = {
    field1: '',
    subForm: {
      subField1: '',
      subField2: undefined as any,
    },
  };
}
