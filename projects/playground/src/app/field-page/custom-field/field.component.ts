import { Component, ContentChild, Input } from '@angular/core';
import { FeControl, FeRequiredValidatorDirective } from 'ngfe';

@Component({
  selector: 'app-custom-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent<T> {
  @Input() label?: string;

  @ContentChild(FeControl, {static: true}) control!: FeControl;
  @ContentChild(FeRequiredValidatorDirective, {static: true}) requiredValidator?: FeRequiredValidatorDirective;

  get required() {
    return this.requiredValidator?.isRequired;
  }
}
