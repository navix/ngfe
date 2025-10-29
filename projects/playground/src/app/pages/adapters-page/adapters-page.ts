import {JsonPipe} from '@angular/common';
import {Component, linkedSignal, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';

@Component({
  selector: 'app-adapters-page',
  templateUrl: './adapters-page.html',
  imports: [FeModule, JsonPipe],
})
export class AdaptersPage {
  value2 = signal<number>(0);
  value2Input = linkedSignal(() => `${this.value2()}`);
}
