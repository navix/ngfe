import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { ReplaySubject, Subject, Subscription, take } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FeControl } from './fe-control';
import { FeValidity } from './validation';

@Directive({
  selector: '[feForm],form',
  exportAs: 'feForm',
})
export class FeForm implements OnChanges, OnDestroy {
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
  readonly invalid$ = this._validityCheck$.pipe(
    debounceTime(0),
    map(() => this.invalid),
    distinctUntilChanged(),
  );
  readonly pending$ = this._validityCheck$.pipe(
    debounceTime(0),
    map(() => this.pending),
    distinctUntilChanged(),
  );

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
    this._validityCheck$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

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

  /**
   * @internal
   */
  addControl(control: FeControl) {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      if (!this.controlsMap.has(control)) {
        this.ngZone.run(() => {
          this.controlsMap.set(control, [
            control.modelValue$.subscribe(this._modelValueChange$),
            control.validity$.subscribe(() => this._validityCheck$.next(undefined)),
          ]);
        });
      }
    });
  }

  /**
   * @internal
   */
  removeControl(control: FeControl) {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      const subs = this.controlsMap.get(control);
      if (subs) {
        subs.forEach(s => s.unsubscribe());
        this.controlsMap.delete(control);
        this.ngZone.run(() => {
          this._validityCheck$.next(undefined);
        });
      }
    });
  }
}
