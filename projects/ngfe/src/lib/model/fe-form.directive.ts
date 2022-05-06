import { Directive } from '@angular/core';
import { FeModel } from './fe-model.directive';

@Directive({
  selector: 'form',
  exportAs: 'feForm',
})
export class FeForm {
  models = new Set<FeModel>();

  constructor() {
  }

  touchAll() {
    this.models.forEach(m => m.touched = true);
  }

  get valid() {
    return [...this.models].every(m => !m.errors);
  }

  // @todo valid$
  // @todo value
  // @todo value$
  // @todo reset
}
