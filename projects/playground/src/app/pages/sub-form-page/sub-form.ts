import {Component, computed, input, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';

export class SubFormState {
  subField1 = signal('SUBF1_INIT');
  subField2 = signal(10);

  data = computed(() => ({
    subField1: this.subField1(),
    subField2: this.subField2(),
  }));
}

@Component({
  selector: 'app-sub-form',
  imports: [FeModule],
  templateUrl: './sub-form.html',
})
export class SubForm {
  subForm = input.required<SubFormState>();
}
