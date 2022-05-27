import { Directive, HostBinding, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FeControl } from './fe-control';
import { FeValidity } from './validation';

@Directive({
  selector: '[feForm],form',
  exportAs: 'feForm',
})
export class FeFormDirective implements OnChanges, OnDestroy {
  @Input() disabled = false;

  @HostBinding('attr.novalidate') novalidate = '';

  private controlsMap = new Map<FeControl, Subscription[]>();

  private _modelValueChange$ = new Subject<undefined>();
  readonly change$ = this._modelValueChange$.pipe(
    debounceTime(0),
  );

  private _validityCheck$ = new ReplaySubject<undefined>(1);
  readonly validity$ = this._validityCheck$.pipe(
    debounceTime(0),
    map(() => this.validity),
    distinctUntilChanged(),
  );
  readonly valid$ = this._validityCheck$.pipe(
    debounceTime(0),
    map(() => this.valid),
    distinctUntilChanged(),
  );

  ngOnChanges(changes: SimpleChanges) {
    if ('disabled' in changes) {
      this.controls.forEach(control => control.disabled = this.disabled);
    }
  }

  ngOnDestroy() {
    this._modelValueChange$.complete();
  }

  get controls() {
    return [...this.controlsMap.keys()];
  }

  get enabledControls() {
    return this.controls.filter(control => !control.disabled);
  }

  get validity(): FeValidity {
    return this.pending
      ? 'pending'
      : this.invalid
        ? 'invalid'
        : 'valid';
  }

  get invalid() {
    return this.enabledControls.some(m => m.invalid);
  }

  get pending() {
    return this.enabledControls.some(m => m.pending);
  }

  get valid() {
    return this.enabledControls.every(m => m.valid);
  }

  get touched() {
    return this.enabledControls.some(m => m.touched);
  }

  get dirty() {
    return this.enabledControls.some(m => m.dirty);
  }

  touchAll() {
    this.enabledControls.forEach(m => m.touch());
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
