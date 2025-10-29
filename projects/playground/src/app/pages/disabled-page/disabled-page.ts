import {AsyncPipe, JsonPipe} from '@angular/common';
import {Component, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';

@Component({
  selector: 'app-disabled-page',
  imports: [FeModule, JsonPipe, AsyncPipe],
  templateUrl: './disabled-page.html',
})
export class DisabledPage {
  value1 = signal('');
  value2 = signal('');
  disabled2 = signal(false);
  value3 = signal('');
  disabled3 = signal(false);
}
