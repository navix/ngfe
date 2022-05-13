import { Component, Host, Input } from '@angular/core';
import { FeField } from 'ngfe';

@Component({
  selector: 'app-custom-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent<T> {
  @Input() label?: string;

  constructor(
    @Host() private field: FeField<T>,
  ) {
    console.log('MODEL', this.field.model);
  }

  get model() {
    return this.field.model;
  }

  get required() {
    return false;
//    return !!this.model?.getValidator('required');
  }
}
