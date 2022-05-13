import { Directive } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FeModel } from './fe-model.directive';

@Directive({
  selector: '[feForm]',
  exportAs: 'feForm',
})
export class FeForm {
  private modelsMap = new Map<FeModel, Subscription>();

  private _change$ = new Subject<undefined>();

  get models() {
    return [...this.modelsMap.keys()];
  }

  get invalid() {
    return this.models.some(m => m.invalid);
  }

  get pending() {
    return this.models.some(m => m.pending);
  }

  get valid() {
    return this.models.every(m => m.valid);
  }

  get touched() {
    return this.models.some(m => m.touched);
  }

  get dirty() {
    return this.models.some(m => m.dirty);
  }

  get change$() {
    return this._change$.asObservable();
  }

  touchAll() {
    this.models.forEach(m => m.touched = true);
  }

  reset() {
    this.models.forEach(m => m.reset());
  }

  addModel(model: FeModel) {
    this.modelsMap.set(model, model.value$.subscribe(this._change$));
  }

  removeModel(model: FeModel) {
    const sub = this.modelsMap.get(model);
    if (sub) {
      sub.unsubscribe();
      this.modelsMap.delete(model);
    }
  }
}
