import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';
import {FormField} from './form-field/form-field';

@Component({
  selector: 'app-demo-form-field-page',
  templateUrl: './demo-form-field-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, JsonPipe, FeModule],
})
export class DemoFormFieldPage {
  value1 = signal('');
  value2 = signal('');
  required2 = signal(true);
}
