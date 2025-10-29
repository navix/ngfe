import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {FeModule, FeValidator} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';

@Component({
  selector: 'app-validation-page',
  imports: [FeModule, ValueView],
  templateUrl: './validation-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationPage {
  value1 = signal('');
  value2 = signal('');
  value3 = signal('');
  value4 = signal('');
  value5 = signal('');
  value6 = signal('');
  value7 = signal('');
  value8 = signal('');
  value9 = signal('aaa');
  value10 = signal<number | undefined>(undefined);
  value11 = signal(123);
  value12 = signal('');
  value13 = signal('');
  value14_1 = signal('');
  value14_2 = signal('');
  value14_3 = signal('');

  syncVal: FeValidator<string> = value => {
    return value !== '' ? undefined : {fn: true};
  };

  asyncValObs: FeValidator<string> = value => {
    return of(value !== '123' ? {avo: true} : undefined).pipe(delay(100));
  };

  asyncValProm: FeValidator<string> = value => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value !== '456' ? {avp: true} : undefined);
      }, 100);
    });
  };

  constructor() {}
}
