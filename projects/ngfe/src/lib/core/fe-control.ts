import { ChangeDetectorRef, Inject, Injectable, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, forkJoin, from, merge, Observable, of, Subject, timer } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { diff } from '../util';
import { FeAdapter, feAdapters } from './adapters';
import { FeFormDirective } from './fe-form.directive';
import { FeErrors, FeValidator, FeValidatorResult, FeValidity } from './validation';

interface Vc<MODEL, INPUT> {
  source: 'initial' | 'model' | 'input';
  modelValue?: MODEL;
  inputValue?: INPUT;
}

@Injectable()
export class FeControl<MODEL = any, INPUT = any> implements OnDestroy {
  private readonly _vc$ = new BehaviorSubject<Vc<MODEL, INPUT>>({source: 'initial'});
  /**
   * Stream with current MODEL value.
   * Does not emit initial value.
   */
  readonly modelValue$: Observable<MODEL> = this._vc$.pipe(
    filter(value => value.source !== 'initial'),
    map(value => value.modelValue!),
  );
  /**
   * Get INPUT value stream which come from model.
   */
  readonly toInputValue$: Observable<INPUT | undefined> = this._vc$.pipe(
    filter(vc => vc.source === 'model'),
    map(vc => vc.inputValue),
  );

  private readonly _modelValueUpdate$ = new Subject<MODEL>();
  private readonly _inputValueUpdate$ = new Subject<INPUT>();

  private readonly _disabled$ = new BehaviorSubject<boolean>(false);
  readonly disabled$ = this._disabled$.pipe(distinctUntilChanged());

  private readonly _standalone$ = new BehaviorSubject<boolean>(false);
  readonly standalone$ = this._standalone$.pipe(distinctUntilChanged());

  private readonly _touched$ = new BehaviorSubject<boolean>(false);
  readonly touched$ = this._touched$.pipe(distinctUntilChanged());

  private readonly _dirty$ = new BehaviorSubject<boolean>(false);
  readonly dirty$ = this._dirty$.pipe(distinctUntilChanged());

  private readonly _validators$ = new BehaviorSubject<FeValidator<MODEL>[]>([]);
  readonly validators$ = this._validators$.asObservable();

  private readonly _updateValidity$ = new Subject<undefined>();
  private readonly _validity$ = new BehaviorSubject<FeValidity>('initial');
  readonly validity$ = this._validity$.pipe(distinctUntilChanged());
  readonly valid$ = this._validity$.pipe(map(v => v === 'valid'));
  readonly invalid$ = this._validity$.pipe(map(v => v === 'invalid'));
  readonly pending$ = this._validity$.pipe(map(v => v === 'pending'));

  private readonly _errors$ = new BehaviorSubject<FeErrors | undefined>(undefined);
  readonly errors$ = this._errors$.asObservable();
  readonly visibleErrors$ = merge(this.touched$, this.errors$).pipe(map(() => this.visibleErrors));

  private readonly _destroy$ = new Subject<undefined>();
  readonly destroy$ = this._destroy$.asObservable();

  private _adapter: FeAdapter<MODEL, INPUT> = feAdapters.noop;
  private _debounce?: number;

  constructor(
    @Optional() @Inject(FeFormDirective) private group: FeFormDirective | undefined,
    @Optional() @Inject(FeControl) @SkipSelf() private parentControl: FeControl | undefined,
    private cdr: ChangeDetectorRef,
    // @todo public elementRef ??
  ) {
    if (this.group) {
      this.standalone$.subscribe(() => {
        this.handleGroupRegistration();
      });
    }
    this.initInputValueHandler();
    this.initModelValueHandler();
    this.initValidityHandler();
    merge(this.modelValue$, this.validators$).subscribe(() => {
      this.updateValidity();
    });
  }

  ngOnDestroy() {
    if (this.group) {
      this.group.removeControl(this);
    }
    this._vc$.complete();
    this._modelValueUpdate$.complete();
    this._inputValueUpdate$.complete();
    this._disabled$.complete();
    this._standalone$.complete();
    this._touched$.complete();
    this._dirty$.complete();
    this._validators$.complete();
    this._validity$.complete();
    this._errors$.complete();
    this._updateValidity$.complete();
    this._destroy$.next();
    this._destroy$.complete();
  }

  get modelValue(): MODEL | undefined {
    return this._vc$.value?.modelValue;
  }

  get inputValue(): INPUT | undefined {
    return this._vc$.value.inputValue;
  }

  get disabled() {
    return this._disabled$.value;
  }

  set disabled(disabled: boolean) {
    if (this.disabled !== disabled) {
      this._disabled$.next(disabled);
    }
  }

  get standalone() {
    return this._standalone$.value;
  }

  set standalone(standalone: boolean) {
    if (this.standalone !== standalone) {
      this._standalone$.next(standalone);
    }
  }

  get dirty() {
    return this._dirty$.value;
  }

  set dirty(dirty: boolean) {
    if (dirty !== this.dirty) {
      this._dirty$.next(dirty);
    }
  }

  get errors() {
    return this._errors$.value;
  }

  get validity() {
    return this._validity$.value;
  }

  /**
   * True when control passed all validators.
   */
  get valid() {
    return this.validity === 'valid';
  }

  /**
   * True if control has errors.
   * Invalid state is not opposite to valid - pending control is also not invalid.
   */
  get invalid() {
    return this.validity === 'invalid';
  }

  /**
   * True if control has async validators in progress.
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

  get validators() {
    return this._validators$.value;
  }

  // @todo `VisibleErrorsStrategy`
  get visibleErrors() {
    return this.touched && this.errors;
  }

  set adapter(adapter: FeAdapter<MODEL, INPUT> | undefined) {
    this._adapter = adapter || feAdapters.noop;
    this._modelValueUpdate$.next(this.modelValue);
  }

  set debounce(debounce: number | undefined) {
    this._debounce = debounce;
  }

  /**
   * Set new MODEL value.
   */
  update(modelValue: MODEL) {
    if (modelValue === this.modelValue) {
      return;
    }
    this._modelValueUpdate$.next(modelValue);
  }

  /**
   * Set new INPUT value.
   */
  input(inputValue: INPUT) {
    if (inputValue === this.inputValue) {
      return;
    }
    this._inputValueUpdate$.next(inputValue);
  }

  /**
   * Set touched to true.
   */
  touch() {
    this.touched = true;
  }

  updateValidators({add = [], remove = []}: {
    add?: FeValidator<MODEL, INPUT>[];
    remove?: FeValidator<MODEL, INPUT>[];
  }) {
    this._validators$.next([...new Set([...this.validators, ...add])].filter(v => remove.indexOf(v) === -1));
  }

  addValidator(validator: FeValidator<MODEL, INPUT>) {
    this.updateValidators({add: [validator]});
  }

  updateValidity() {
    this._updateValidity$.next();
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

  private initModelValueHandler() {
    this._modelValueUpdate$.pipe(
      debounceTime(0),
    ).subscribe((modelValue) => {
      this._vc$.next({
        source: 'model',
        modelValue,
        inputValue: this._adapter.fromModel(modelValue),
      });
    });
  }

  private initInputValueHandler() {
    this._inputValueUpdate$.pipe(
      debounce(() => timer(this._debounce)),
    ).subscribe(inputValue => {
      this._vc$.next({
        source: 'input',
        modelValue: this._adapter.fromInput(inputValue),
        inputValue,
      });
      this.dirty = true;
    });
  }

  private initValidityHandler() {
    // @todo properly handle throws in stream
    this
      ._updateValidity$
      .asObservable()
      .pipe(
        // Makes validators run async from init and gather multiple sync calls.
        debounceTime(0),
        switchMap(() => {
          let syncs: Observable<FeValidatorResult>[] = [];
          let asyncs: Observable<FeValidatorResult>[] = [];
          for (const validator of this.validators) {
            const res = validator(this);
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
            this.cdr.markForCheck();
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
        this.cdr.markForCheck();
      });
  }
}
