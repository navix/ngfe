import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { err } from '../util';
import { FeModel } from './fe-model.directive';

@Directive({
  selector: '[feField]',
})
export class FeField<T> {
  private _model?: FeModel<T>;

  private classes = {
    touched: '-fe-touched',
    dirty: '-fe-dirty',
    invalid: '-fe-invalid',
    pending: '-fe-pending',
    valid: '-fe-valid',
  };

  constructor(
    private renderer2: Renderer2,
    private elRef: ElementRef,
  ) {
  }

  set model(model: FeModel<T> | undefined) {
    if (this._model) {
      err('FeField', 'Only one model can be bound inside [feField].');
    }
    this._model = model;
    if (this._model) {
      this.handleModel();
    }
  }

  get model() {
    return this._model;
  }

  private handleModel() {
    this._model!.touched$.subscribe(touched => {
      this.updateClasses(touched ? {add: [this.classes.touched]} : {remove: [this.classes.touched]});
    });
    this._model!.dirty$.subscribe(dirty => {
      this.updateClasses(dirty ? {add: [this.classes.dirty]} : {remove: [this.classes.dirty]});
    });
    this._model!.validity$.subscribe(validity => {
      switch (validity) {
        case 'initial':
          this.updateClasses({remove: [this.classes.invalid, this.classes.pending, this.classes.valid]});
          break;
        case 'invalid':
          this.updateClasses({add: [this.classes.invalid], remove: [this.classes.pending, this.classes.valid]});
          break;
        case 'pending':
          this.updateClasses({add: [this.classes.pending], remove: [this.classes.invalid, this.classes.valid]});
          break;
        case 'valid':
          this.updateClasses({add: [this.classes.valid], remove: [this.classes.invalid, this.classes.pending]});
          break;
      }
    });
  }

  private updateClasses({add = [], remove = []}: {add?: string[]; remove?: string[]}) {
    for (const cls of remove) {
      this.renderer2.removeClass(this.elRef.nativeElement, cls);
    }
    for (const cls of add) {
      this.renderer2.addClass(this.elRef.nativeElement, cls);
    }
  }
}
