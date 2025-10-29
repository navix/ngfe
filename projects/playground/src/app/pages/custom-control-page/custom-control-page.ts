import {Component, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';
import {CustomControl} from './custom-control';

@Component({
  selector: 'app-custom-control-page',
  imports: [FeModule, CustomControl, ValueView],
  templateUrl: './custom-control-page.html',
})
export class CustomControlPage {
  value1 = signal('');
}
