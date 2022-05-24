import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  form: {
    field1: string;
    showField2: boolean;
    field2?: number;
    showField3: boolean;
    field3?: {subField: string}[];
  } = {
    field1: '',
    showField2: false,
    showField3: false,
  }
}
