import { Directive, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FeControl } from './fe-control';

@Directive({
  selector: '[feGroup]',
  exportAs: 'feGroup',
})
export class FeGroupDirective implements OnDestroy {
  private controlsMap = new Map<FeControl, Subscription>();

  private _change$ = new Subject<undefined>();

  ngOnDestroy() {
    this._change$.complete();
  }

  get controls() {
    return [...this.controlsMap.keys()];
  }

  get invalid() {
    return this.controls.some(m => m.invalid);
  }

  get pending() {
    return this.controls.some(m => m.pending);
  }

  get valid() {
    return this.controls.every(m => m.valid);
  }

  get touched() {
    return this.controls.some(m => m.touched);
  }

  get dirty() {
    return this.controls.some(m => m.dirty);
  }

  get change$() {
    return this._change$.pipe(delay(0));
  }

  touchAll() {
    this.controls.forEach(m => m.touched = true);
  }

  reset() {
    this.controls.forEach(m => m.reset());
  }

  addControl(control: FeControl) {
    if (!this.controlsMap.has(control)) {
      this.controlsMap.set(control, control.modelValue$.subscribe(this._change$));
    }
  }

  removeControl(control: FeControl) {
    const sub = this.controlsMap.get(control);
    if (sub) {
      sub.unsubscribe();
      this.controlsMap.delete(control);
    }
  }
}
