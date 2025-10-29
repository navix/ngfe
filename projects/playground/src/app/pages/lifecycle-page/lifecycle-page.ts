import {Component, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';

@Component({
  selector: 'app-lifecycle-page',
  imports: [FeModule, ValueView],
  templateUrl: './lifecycle-page.html',
})
export class LifecyclePage {
  value1 = signal<string | undefined>('123');
  show1 = signal(true);
  value2 = signal('');
  value3 = signal('');
}
