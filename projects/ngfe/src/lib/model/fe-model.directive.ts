import {
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
import { BehaviorSubject, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { diff } from '../util';
import { FeForm } from './fe-form.directive';
import { FeModelState } from './fe-model-state';
import { FeErrors, FeValidator, FeValidatorResult } from './fe-validator';

@Directive({
  selector: '[feModel]',
  exportAs: 'feModel',
})
export class FeModel<T = any> implements OnInit, OnChanges, OnDestroy {
  @Input() feModel!: T;

  @Input() name?: string;

  @Input() validators?: FeValidator<T>[];

  // @todo impl - do not register in the form
  @Input() standalone = false;

  @Output() feModelChange = new EventEmitter<T>();

  readonly initialValue = Symbol('initial');

  private readonly _state$ = new BehaviorSubject<FeModelState<T>>({
    value: this.initialValue,
    touched: false,
    dirty: false,
    validators: [],
    validity: 'initial',
    errors: {},
  });

  private readonly _updateValidityCall$ = new Subject<undefined>();

  constructor(
    @Optional() @Inject(FeForm) public form: FeForm | undefined,
  ) {
    this.form?.models.add(this);
    this.value$.pipe().subscribe(() => {
      this.updateValidity();
    });
    this._state$.subscribe(state => {
      console.log('STATE$', state);
    }, error => {
      console.log('ERR RLY');
    }, () => {
      console.log('CMPL');
    });
    this.initValidityHandler();
  }

  ngOnInit() {
    console.log('ON_INIT', this._state$);
    this.value$.subscribe(value => {
      console.log('VALUE$', value);
    });
    this
      .value$
      .pipe(
        filter(value => value !== this.feModel),
      )
      .subscribe(value => {
        console.log('EMIT', value);
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
//    if (!this.name) {
//      throw new Error('feModel should have a name.');
//    }
    if ('feModel' in changes) {
      if (this.feModel === this.value) {
        return;
      }
      this.write(this.feModel, {
        markAsDirty: false,
      });
    }
    if ('validators' in changes) {
      const prev: FeValidator<T>[] | undefined = changes.validators.previousValue;
      this.updateValidators({
        add: this.validators,
        remove: prev?.filter(f => this.validators?.indexOf(f) === -1) || [],
      });
    }
  }

  ngOnDestroy() {
    this.form?.models.delete(this);
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

  // @todo get displayedErrors$(), ->touchedErrors?
  get displayedErrors() {
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

  get valueToControl$(): Observable<T> {
    return this
      .state$
      .pipe(
        filter(state => state.value !== state.valueFromControl),
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
    this._state$.next({
      ...this.state,
      ...fromControl ? {valueFromControl: value} : {},
      ...markAsDirty ? {dirty: true} : {},
      value,
    });
    console.log('WRT', value, this._state$);
  }

  writeFromControl(value: T) {
    this.write(value, {markAsDirty: true, fromControl: true});
  }

  // @todo use for add and remove
  updateValidators({add = [], remove = []}: {
    add?: FeValidator<T>[];
    remove?: FeValidator<T>[];
  }) {
    console.log('UPD VALS');
    this._state$.next({
      ...this.state,
      validators: [...new Set([...this.state.validators, ...add])].filter(v => remove.indexOf(v) === -1),
    });
  }

  addValidator(validator: FeValidator<T>) {
    this.updateValidators({add: [validator]});
  }

  // @todo run revalidate after zone tick?
  // @todo update validity for passed names
  updateValidity() {
    this._updateValidityCall$.next();
  }

  private initValidityHandler() {
    this
      ._updateValidityCall$
      .asObservable()
      .pipe(
        switchMap(() => {
          let syncs: Observable<FeValidatorResult>[] = [];
          let asyncs: Observable<FeValidatorResult>[] = [];
          for (const validator of this.state.validators) {
            const res = validator({value: this.value!});
            if (res instanceof Observable) {
              console.log('VAL.OBSRV', res);
              asyncs.push(res);
              continue;
            }
            if (res instanceof Promise) {
              console.log('VAL.PRMS', res);
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
          }
          return forkJoin([...syncs, ...asyncs]);
        }),
      )
      .subscribe(errorsArray => {
        console.log('>>>>> HANDLE ERRRS ARR');
        let errors: FeErrors = {};
        for (const error of errorsArray) {
          if (error) {
            errors = {
              ...errors,
              ...error,
            };
          }
        }
        if (diff(this.state.errors, errors, {cyclesFix: false}).length === 0) {
          return;
        }
        console.log('UPD VALIDITY', errors, this.state.errors);
        this._state$.next({
          ...this.state,
          errors,
          validity: Object.keys(errors).length > 0 ? 'invalid' : 'valid',
        });
      });
  }
}
