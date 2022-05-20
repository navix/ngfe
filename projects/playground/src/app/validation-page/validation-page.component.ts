import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeValidator } from 'ngfe';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-validation-page',
  templateUrl: './validation-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationPageComponent {
  value1 = '';
  value2 = '';
  value3 = '';
  value4 = '';
  value5 = '';
  value6 = '';
  value7 = '';
  value8 = '';
  value9 = 'aaa';
  value10?: number;
  value11 = 123;
  value12 = '';
  value13 = '';
  value14_1 = '';
  value14_2 = '';

  syncVal: FeValidator<string> = ({modelValue}) => {
    return modelValue !== '' ? undefined : {fn: true};
  };

  asyncValObs: FeValidator<string> = ({modelValue}) => {
    return of(modelValue !== '123' ? {avo: true} : undefined).pipe(delay(200));
  };

  asyncValProm: FeValidator<string> = ({modelValue}) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(modelValue !== '456' ? {avp: true} : undefined);
      }, 200);
    });
  };

  constructor() {
  }
}
