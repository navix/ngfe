import { Component } from '@angular/core';
import { FeValidator } from 'ngfe';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-validators-page',
  templateUrl: './validators-page.component.html',
  styleUrls: ['./validators-page.component.scss'],
})
export class ValidatorsPageComponent {
  model0 = '';
  model1 = '';

  debounce = 400;

  asyncValObs: FeValidator<string> = ({value}) => {
    return of({avo: true}).pipe(delay(500), tap(() => console.log('**** AVO END TAP')));
  };

  asyncValProm: FeValidator<string> = ({value}) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({avp: true});
      }, 500);
    });
  };

  optAsyncObs: FeValidator<string> = ({value}) => {
    if (!value) {
      return undefined;
    }
    return of({oavo: true}).pipe(delay(500), tap(() => console.log('**** AVO END TAP')));
  };
}
