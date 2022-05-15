import { Inject, Injectable, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, forkJoin, from, merge, Observable, of, Subject, timer } from 'rxjs';
import { debounce, delay, filter, switchMap } from 'rxjs/operators';
import { diff } from '../util';
import { FeGroupDirective } from './fe-group.directive';
import { FeErrors, FeValidator, FeValidatorResult, FeValidity } from './validation';

@Injectable()
export class FeControl<T = any> implements OnDestroy {
  debounce = 0;

  readonly initialValue = Symbol('initial');

  private readonly _value$ = new BehaviorSubject<T | symbol>(this.initialValue);
  private readonly _input$ = new Subject<T>();
  private readonly _disabled$ = new BehaviorSubject<boolean>(false);
  private readonly _standalone$ = new BehaviorSubject<boolean>(false);
  private readonly _touched$ = new BehaviorSubject<boolean>(false);
  private readonly _dirty$ = new BehaviorSubject<boolean>(false);
  private readonly _validators$ = new BehaviorSubject<FeValidator<T>[]>([]);
  private readonly _validity$ = new BehaviorSubject<FeValidity>('initial');
  private readonly _errors$ = new BehaviorSubject<FeErrors | undefined>(undefined);
  private readonly _updateValidityCall$ = new Subject<undefined>();
  private readonly _destroy$ = new Subject<undefined>();

  private inputValue?: T;

  constructor(
    @Optional() @Inject(FeGroupDirective) private group: FeGroupDirective | undefined,
    @Optional() @Inject(FeControl) @SkipSelf() private parentControl: FeControl | undefined,
  ) {
    if (this.group) {
      merge(this.disabled$, this.standalone$).subscribe(() => {
        this.handleGroupRegistration();
      });
    }
    this.initInputHandler();
    this.initValidityHandler();
    merge(this.value$, this.validators$).subscribe(() => {
      this.updateValidity();
    });
  }

  ngOnDestroy() {
    if (this.group) {
      this.group.removeControl(this);
    }
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Returns current value.
   * Undefined if initial.
   */
  get value(): T | undefined {
    const value = this._value$.value;
    return this.isInitialValue(value) ? undefined : value;
  }

  /**
   * Stream with current value, does not emit initial value.
   */
  get value$(): Observable<T> {
    return this
      ._value$
      .pipe(
        filter((value): value is T => !this.isInitialValue(value)),
      );
  }

  get inputValue$() {
    return this.value$.pipe(filter(value => value !== this.inputValue));
  }

  get disabled() {
    return this._disabled$.value;
  }

  set disabled(disabled: boolean) {
    if (this.disabled !== disabled) {
      this._disabled$.next(disabled);
    }
  }

  get disabled$() {
    return this._disabled$.asObservable();
  }

  get standalone() {
    return this._standalone$.value;
  }

  set standalone(standalone: boolean) {
    if (this.standalone !== standalone) {
      this._standalone$.next(standalone);
    }
  }

  get standalone$() {
    return this._standalone$.asObservable();
  }

  get dirty() {
    return this._dirty$.value;
  }

  set dirty(dirty: boolean) {
    if (dirty !== this.dirty) {
      this._dirty$.next(dirty);
    }
  }

  get dirty$() {
    return this._dirty$.asObservable();
  }

  get errors() {
    return this._errors$.value;
  }

  get errors$() {
    return this._errors$.asObservable();
  }

  get validity() {
    return this._validity$.value;
  }

  get validity$() {
    return this._validity$.asObservable();
  }

  /**
   * True when model passed all validators.
   */
  get valid() {
    return this.validity === 'valid';
  }

  /**
   * True if model has errors.
   * Invalid state is not opposite to valid - pending model is also not invalid.
   */
  get invalid() {
    return this.validity === 'invalid';
  }

  /**
   * True if model has async validators in progress.
   */
  get pending() {
    return this.validity === 'pending';
  }

  get touched() {
    return this._touched$.value;
  }

  set touched(touched: boolean) {
    if (this.touched !== touched) {
      this._touched$.next(touched);
    }
  }

  get touched$() {
    return this._touched$.asObservable();
  }

  get validators() {
    return this._validators$.value;
  }

  get validators$() {
    return this._validators$.asObservable();
  }

  get destroy$() {
    return this._destroy$.asObservable();
  }

  isInitialValue(value: T | symbol): value is symbol {
    return value === this.initialValue;
  }

  updateValue(value: T) {
    if (value === this.value) {
      return;
    }
    this._value$.next(value);
  }

  input(value: T) {
    this._input$.next(value);
  }

  touch() {
    this.touched = true;
  }

  updateValidators({add = [], remove = []}: {
    add?: FeValidator<T>[];
    remove?: FeValidator<T>[];
  }) {
    this._validators$.next([...new Set([...this.validators, ...add])].filter(v => remove.indexOf(v) === -1));
  }

  updateValidity() {
    this._updateValidityCall$.next();
  }

  /**
   * Reset state (touched, dirty, etc), not the value.
   */
  reset() {
    this.dirty = false;
    this.touched = false;
    this._validity$.next('initial');
    this._errors$.next(undefined);
    this.updateValidity();
  }

  private handleGroupRegistration() {
    if (!this.parentControl && !this.disabled && !this.standalone) {
      this.group!.addControl(this);
    } else {
      this.group!.removeControl(this);
    }
  }

  private initInputHandler() {
    this._input$.pipe(
      debounce(() => timer(this.debounce)),
    ).subscribe(value => {
      this.updateValue(value);
      this.dirty = true;
    });
  }

  private initValidityHandler() {
    // @todo properly handle throws in stream
    this
      ._updateValidityCall$
      .asObservable()
      .pipe(
        // Makes validators run async from init and gather multiple sync calls.
        delay(0),
        switchMap(() => {
          let syncs: Observable<FeValidatorResult>[] = [];
          let asyncs: Observable<FeValidatorResult>[] = [];
          for (const validator of this.validators) {
            const res = validator({value: this.value!});
            if (res instanceof Observable) {
              asyncs.push(res);
              continue;
            }
            if (res instanceof Promise) {
              asyncs.push(from(res));
              continue;
            }
            syncs.push(of(res));
          }
          if (asyncs.length > 0) {
            this._validity$.next('pending');
            this._errors$.next(undefined);
            return forkJoin([...syncs, ...asyncs]);
          } else if (syncs.length > 0) {
            return forkJoin([...syncs]);
          } else {
            return of([]);
          }
        }),
      )
      .subscribe(errorsArray => {
        let errors: FeErrors = {};
        for (const error of errorsArray) {
          if (error) {
            errors = {
              ...errors,
              ...error,
            };
          }
        }
        const isValid = Object.keys(errors).length === 0;
        const validity = isValid ? 'valid' : 'invalid';
        if (this.validity === validity && diff(this.errors || {}, errors, {cyclesFix: false}).length === 0) {
          return;
        }
        this._errors$.next(isValid ? undefined : errors);
        this._validity$.next(validity);
      });
  }
}
