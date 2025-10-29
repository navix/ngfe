import {ChangeDetectionStrategy, Component, contentChild, input} from '@angular/core';
import {FeModel, FeRequiredValidator} from '../../../../../../ngfe/src/public-api';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField<T> {
  label = input.required<string>();

  model = contentChild.required(FeModel);
  requiredValidator = contentChild(FeRequiredValidator);
}
