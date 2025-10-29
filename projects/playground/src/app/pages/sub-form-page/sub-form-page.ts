import {Component, computed, signal} from '@angular/core';
import {FeModule} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';
import {SubForm, SubFormState} from './sub-form';

class FormState {
  field1 = signal('F1_INIT');
  subForm = signal(new SubFormState());

  data = computed(() => ({
    field1: this.field1(),
    subForm: this.subForm().data(),
  }));
}

@Component({
  selector: 'app-sub-form-page',
  imports: [FeModule, SubForm, ValueView],
  templateUrl: './sub-form-page.html',
})
export class SubFormPage {
  formState = signal(new FormState());
}
