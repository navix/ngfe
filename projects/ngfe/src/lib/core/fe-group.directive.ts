import { Directive, HostBinding, OnDestroy } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FeControl } from './fe-control';

@Directive({
  selector: '[feGroup]',
  exportAs: 'feGroup',
})
export class FeGroupDirective implements OnDestroy {
  @HostBinding('attr.novalidate') novalidate = '';

  private controlsMap = new Map<FeControl, Subscription[]>();

  private _modelValueChange$ = new Subject<undefined>();
  readonly change$ = this._modelValueChange$.pipe(
    debounceTime(0),
  );

  private _validityCheck$ = new ReplaySubject<undefined>(1);
  readonly valid$ = this._validityCheck$.pipe(
    debounceTime(0),
    map(() => this.valid),
    distinctUntilChanged(),
  );

  ngOnDestroy() {
    this._modelValueChange$.complete();
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

  touchAll() {
    this.controls.forEach(m => m.touched = true);
  }

  reset() {
    this.controls.forEach(m => m.reset());
  }

  addControl(control: FeControl) {
    if (!this.controlsMap.has(control)) {
      this.controlsMap.set(control, [
        control.modelValue$.subscribe(this._modelValueChange$),
        control.validity$.subscribe(() => this._validityCheck$.next()),
      ]);
    }
  }

  removeControl(control: FeControl) {
    const subs = this.controlsMap.get(control);
    if (subs) {
      subs.forEach(s => s.unsubscribe());
      this.controlsMap.delete(control);
      this._validityCheck$.next();
    }
  }
}
