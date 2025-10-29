import {Component, computed, inject} from '@angular/core';
import {FeModel, FeModule} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';

@Component({
  selector: 'app-custom-control',
  imports: [FeModule, ValueView],
  templateUrl: './custom-control.html',
})
export class CustomControl {
  model = inject(FeModel);

  value = computed(() => this.model.value());

  input(value: string | undefined) {
    this.model.input(value || '');
  }
}
