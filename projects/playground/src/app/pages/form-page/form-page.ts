import {Component, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.html',
  imports: [FeModule, ValueView],
})
export class FormPage {
  value1 = signal('');
  submitted1 = signal<boolean | undefined>(undefined);
  submitted1Valid = signal(false);
  submitted1Invalid = signal(false);

  value2 = signal('');
  show2 = signal(true);
  required2 = signal(true);

  value3 = signal('');
  submitted3 = signal<boolean | undefined>(undefined);
  submitted3Valid = signal(false);
  submitted3Invalid = signal(false);

  submit3() {
    console.log('submit3');
  }
}
