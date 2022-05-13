import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, forkJoin, from, Observable, of, Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { coerceToBoolean, diff } from '../util';
import { FeControlRef } from './fe-control-ref';
import { FeField } from './fe-field.directive';
import { FeForm } from './fe-form.directive';
import { FeModelState } from './fe-model-state';
import { FeErrors, FeValidator, FeValidatorResult } from './fe-validator';

@Directive({
  selector: '[feModel]',
  exportAs: 'feModel',
})
export class FeModel<T = any> implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() feModel!: T;

  @Input() name?: string;

  @Input() validators?: FeValidator<T>[];

  /**
   * Disabled model is removed from the FeForm.
   */
  @Input() set disabled(disabled: boolean | string) {
    this._disabled = coerceToBoolean(disabled);
  }

  /**
   * Standalone model is removed from the FeForm.
   */
  @Input() set standalone(standalone: boolean | string) {
    this._standalone = coerceToBoolean(standalone);
  }

  // @todo fix
  @Input() debounce?: number;

  @Output() feModelChange = new EventEmitter<T>();

  @Output() destroy = new EventEmitter<undefined>();

  readonly controlRefs = new Set<FeControlRef<T>>();

  readonly initialValue = Symbol('initial');

  private readonly _state$ = new BehaviorSubject<FeModelState<T>>({
    value: this.initialValue,
    touched: false,
    dirty: false,
    validators: [],
    validity: 'initial',
  });

  private _disabled = false;

  private _standalone = false;

  private readonly _writeFromControl$ = new Subject<T | any>();

  private readonly _updateValidityCall$ = new Subject<undefined>();

  constructor(
    @Optional() @Inject(FeForm) public form: FeForm | undefined,
    @Optional() @Inject(FeField) public field: FeField<T> | undefined,
  ) {
    this.form?.addModel(this);
    if (this.field) {
      this.field.model = this;
    }
    this.value$.pipe().subscribe(() => {
      this.updateValidity();
    });
    this._state$.subscribe(state => {
//      console.log('STATE$', state);
    }, error => {
      console.log('ERR RLY');
    }, () => {
      console.log('CMPL');
    });

    this.initWriteFromControlHandler();
    this.initValidityHandler();
  }

  ngOnInit() {
    this.value$.subscribe(value => {
      console.log('VALUE$', value);
    });
    this
      .value$
      .pipe(
        filter(value => value !== this.feModel),
      )
      .subscribe(value => {
        this.feModelChange.emit(value);
      });
    forkJoin([
      this.value$,
      this.state$.pipe(map(state => state.validators), distinctUntilChanged()),
    ]);
    this
      .value$
      .subscribe(() => {
        this.updateValidity();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('feModel' in changes) {
      if (this.feModel !== this.state.value) {
        this.write(this.feModel);
      }
    }
    if (('disabled' in changes) || ('standalone' in changes)) {
      if (this._disabled || this._standalone) {
        this.form?.removeModel(this);
      } else if (!this._disabled && !this._standalone) {
        this.form?.addModel(this);
      }
    }
    if ('validators' in changes) {
      const prev: FeValidator<T>[] | undefined = changes.validators.previousValue;
      this.updateValidators({
        add: this.validators,
        remove: prev?.filter(f => this.validators?.indexOf(f) === -1) || [],
      });
    }
  }

  ngAfterViewInit() {
    if (this.controlRefs.size === 0) {
      console.warn('FeModel: place a control inside OR on element with [feModel].');
    }
  }

  ngOnDestroy() {
    this.form?.removeModel(this);
    if (this.field) {
      this.field.model = undefined;
    }
    this.destroy.emit();
  }

  get state() {
    return this._state$.value;
  }

  get state$() {
    return this._state$.asObservable();
  }

  get touched() {
    return this.state.touched;
  }

  set touched(touched: boolean) {
    if (this.touched !== touched) {
      this._state$.next({
        ...this.state,
        touched,
      });
    }
  }

  get touched$() {
    return this.state$.pipe(
      map(state => state.touched),
      distinctUntilChanged(),
    );
  }

  get dirty() {
    return this.state.dirty;
  }

  get dirty$() {
    return this.state$.pipe(
      map(state => state.dirty),
      distinctUntilChanged(),
    );
  }

  get displayedErrors() {
    // @todo displayed strategy config
    return this.touched ? this.errors : undefined;
  }

  /**
   * Returns current value.
   * Undefined if initial.
   */
  get value(): T | undefined {
    const value = this.state.value;
    return this.isInitialValue(value) ? undefined : value;
  }

  /**
   * Stream with current value, does not emit initial value.
   */
  get value$(): Observable<T> {
    return this
      .state$
      .pipe(
        map(state => state.value),
        distinctUntilChanged(),
        filter((value): value is T => !this.isInitialValue(value)),
      );
  }

  get errors() {
    return this.state.errors;
  }

  get errors$() {
    return this.state$.pipe(map(state => state.errors), distinctUntilChanged());
  }

  get validity() {
    return this.state.validity;
  }

  get validity$() {
    return this.state$.pipe(map(state => state.validity), distinctUntilChanged());
  }

  /**
   * True when model passed all validators.
   */
  get valid() {
    return this.state.validity === 'valid';
  }

  /**
   * True if model has errors.
   * Invalid state is not opposite to valid - pending model is also not invalid.
   */
  get invalid() {
    return this.state.validity === 'invalid';
  }

  /**
   * True if model has async validators in progress.
   */
  get pending() {
    return this.state.validity === 'pending';
  }

  get disabled() {
    return this._disabled;
  }

  get standalone() {
    return this._standalone;
  }

  isInitialValue(value: T | symbol): value is symbol {
    return value === this.initialValue;
  }

  write(
    value: T,
    {markAsDirty, fromControl}: {
      markAsDirty?: boolean;
      fromControl?: boolean;
    } = {},
  ) {
    if (value === this.value) {
      return;
    }
    this._state$.next({
      ...this.state,
      ...fromControl ? {valueFromControl: value} : {},
      ...markAsDirty ? {dirty: true} : {},
      value,
    });
  }

  updateValidators({add = [], remove = []}: {
    add?: FeValidator<T>[];
    remove?: FeValidator<T>[];
  }) {
    this._state$.next({
      ...this.state,
      validators: [...new Set([...this.state.validators, ...add])].filter(v => remove.indexOf(v) === -1),
    });
  }

  updateValidity() {
    this._updateValidityCall$.next();
  }

  /**
   * Reset state (touched, dirty, etc), not the value.
   */
  reset() {
    this._state$.next({
      ...this.state,
      touched: false,
      dirty: false,
      validity: 'initial',
      errors: undefined,
    });
    this.updateValidity();
  }

  private initWriteFromControlHandler() {
    this
      ._writeFromControl$
      .asObservable()
      .pipe(
        // @todo next line makes this always ASYNC!!! even when debounce === 0
        debounce(() => timer(this.debounce)),
      )
      .subscribe(value => {
        this.write(value, {markAsDirty: true, fromControl: true});
      });
  }

  private initValidityHandler() {
    // @todo properly handle throws in stream
    this
      ._updateValidityCall$
      .asObservable()
      .pipe(
        // Makes validators run async from init and gather multiple sync calls.
        debounce(() => timer(0)),
        switchMap(() => {
          let syncs: Observable<FeValidatorResult>[] = [];
          let asyncs: Observable<FeValidatorResult>[] = [];
          for (const validator of this.state.validators) {
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
            this._state$.next({
              ...this.state,
              errors: {},
              validity: 'pending',
            });
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
        if (this.state.validity === validity && diff(this.state.errors || {}, errors, {cyclesFix: false}).length === 0) {
          return;
        }
        this._state$.next({
          ...this.state,
          errors: isValid ? undefined : errors,
          validity,
        });
      });
  }
}
