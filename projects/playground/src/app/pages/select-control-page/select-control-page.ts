import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';

@Component({
  selector: 'app-select-control-page',
  imports: [FeModule, ValueView],
  templateUrl: './select-control-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlPage {
  value1 = signal('2');
  value2 = signal<string | undefined>(undefined);
  value3 = signal<string | undefined>(undefined);
  value4 = signal(['1', '2']);
  value5 = signal([10, 30]);
  value6 = signal(100);
  value7objects = signal([{field: 123}, {field: 456}, {field: 789}]);
  value7 = signal(this.value7objects()[1]);
  value8 = signal<string | undefined>(undefined);
  value9 = signal('1');
  value10 = signal('1');
  disabled10 = signal(false);
  value11 = signal('');
  value12 = signal('');
  value13 = signal<string | undefined>(undefined);
  value13options = {a: ['1', '2', '3'], b: ['4', '5'], c: ['6', '7', '8', '9']};
  value13currentOptions = signal<'a' | 'b' | 'c'>('a');
}
