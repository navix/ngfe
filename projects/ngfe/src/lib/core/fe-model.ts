import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {
  debounce,
  filter,
  forkJoin,
  from,
  Observable,
  of,
  Subject,
  timer,
  merge,
  takeUntil,
} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {FeForm} from './fe-form';
import {FeValidationErrors, FeValidator, FeValidatorResult, FeValidity} from './validation';

/**
 * Allow to bind value to control.
 * Provides `FeModel` service to handle control state and communications.
 */
@Directive({
  selector: '[model],[modelChange]',
  exportAs: 'model',
})
export class FeModel<VALUE = any> implements OnDestroy {
  readonly elementRef = inject(ElementRef);
  readonly form = inject<FeForm | undefined>(FeForm, {optional: true});
  readonly parentControl = inject<FeModel | undefined>(FeModel, {
    optional: true,
    skipSelf: true,
  });

  readonly model = model<VALUE | undefined>();
  readonly name = input<string>();

  /**
   * Disables the control.
   */
  readonly disabled = model(false);
  readonly disabledWithForm = computed(() => this.disabled() || this.form?.disabled() || false);

  readonly touched = model(false);
  readonly dirty = model(false);

  readonly debounce = input<number>();

  /**
   * Array of FeValidator functions.
   */
  readonly validators = input<FeValidator<VALUE>[]>([]);

  /**
   * Behavior on input validation failure.
   * - `accept` - update value with input value, even if invalid (default).
   * - `retain` - do not update value, keep previous valid value.
   * - `{value: VALUE}` - update value with provided VALUE.
   */
  readonly whenInvalid = input<'accept' | 'retain' | {value: VALUE}>('accept');

  /**
   * Custom errors which will be merged with validation errors.
   * Affects `validity` state.
   */
  readonly forcedErrors = model<FeValidationErrors | 'pending' | undefined>(undefined);

  /**
   * Does not register in form or parent group.
   */
  readonly standalone = input(false, {transform: booleanAttribute});

  readonly destroy = output();

  readonly value = computed(() => this.model());
  readonly value$ = toObservable(this.value);

  readonly #attachedValidators = signal<FeValidator<VALUE>[]>([]);
  readonly allValidators = computed<FeValidator<VALUE>[]>(() => [
    ...this.#attachedValidators(),
    ...(this.validators() || []),
  ]);
  readonly validatedValue = signal<VALUE | undefined>(undefined);

  readonly #input$ = new Subject<VALUE | undefined>();

  readonly valueErrors = signal<FeValidationErrors | 'pending' | undefined>(undefined);
  readonly errors = computed<FeValidationErrors | undefined>(() => {
    const valueErrors = this.valueErrors();
    const forcedErrors = this.forcedErrors();
    if (valueErrors === undefined && forcedErrors === undefined) {
      return undefined;
    }
    if (valueErrors === 'pending' || forcedErrors === 'pending') {
      return undefined;
    }
    return {
      ...(valueErrors || {}),
      ...(forcedErrors || {}),
    };
  });
  readonly errors$ = toObservable(this.errors);
  readonly visibleErrors = computed<FeValidationErrors | undefined>(() => {
    // @todo `VisibleErrorsStrategy`
    const errors = this.errors();
    if (!this.touched()) {
      return undefined;
    }
    return errors;
  });

  readonly validity = computed<FeValidity>(() => {
    const valueErrors = this.valueErrors();
    const extraErrors = this.forcedErrors();
    if (valueErrors === 'pending' || extraErrors === 'pending') {
      return 'pending';
    }
    if (valueErrors === undefined && extraErrors === undefined) {
      return 'valid';
    }
    return 'invalid';
  });
  readonly validity$ = toObservable(this.validity);

  /**
   * True when control passed all validators.
   */
  readonly valid = computed(() => this.validity() === 'valid');

  /**
   * True if control has errors.
   * Invalid state is not opposite to valid - pending control is also not invalid.
   */
  readonly invalid = computed(() => this.validity() === 'invalid');

  /**
   * True if control has async validators in progress.
   */
  readonly pending = computed(() => this.validity() === 'pending');

  readonly #updateValidity$ = new Subject<undefined>();

  constructor() {
    // Handle form registration
    if (this.form) {
      effect(() => {
        if (!this.parentControl && !this.standalone()) {
          this.form!.addControl(this);
        } else {
          this.form!.removeControl(this);
        }
      });
    }

    this.initInputHandler();
    this.initValidityHandler();
  }

  ngOnDestroy() {
    if (this.form) {
      this.form.removeControl(this);
    }
    this.destroy.emit();
  }

  /**
   * Set (feControl) value.
   */
  update(value: VALUE | undefined) {
    this.model.set(value);
  }

  /**
   * Run input flow: set INPUT value, run input validators, if valid update value.
   */
  input(inputValue: VALUE | undefined) {
    console.log('Input', inputValue);
    this.#input$.next(inputValue);
  }

  /**
   * Set touched to true.
   */
  touch() {
    this.touched.set(true);
  }

  updateValidators({
    add = [],
    remove = [],
  }: {
    add?: FeValidator<VALUE>[];
    remove?: FeValidator<VALUE>[];
  }) {
    this.#attachedValidators.update(validators =>
      [...new Set([...validators, ...add])].filter(v => remove.indexOf(v) === -1),
    );
  }

  /**
   * Add validator and return function to remove it.
   */
  addValidator(validator: FeValidator<VALUE>) {
    const removeFn = () => this.updateValidators({remove: [validator]});
    this.updateValidators({add: [validator]});
    return removeFn;
  }

  updateValidity() {
    this.#updateValidity$.next(undefined);
  }

  /**
   * Reset state (touched, dirty, etc), not the value.
   */
  reset() {
    this.dirty.set(false);
    this.touched.set(false);
    this.setValueErrors(undefined, this.value());
    this.forcedErrors.set(undefined);
    this.updateValidity();
  }

  private initInputHandler() {
    this.#input$
      .pipe(
        takeUntilDestroyed(),
        debounce(() => timer(this.debounce() || 0)),
        switchMap(inputValue => {
          this.dirty.set(true);
          this.setValueErrors('pending', this.value());
          return this.execValidators(this.allValidators(), inputValue).pipe(
            takeUntil(this.#input$), // Cancel validation to not set errors/value, until new input is in debounce.
            map(validationResults => ({validationResults, inputValue})),
          );
        }),
      )
      .subscribe(({validationResults, inputValue}) => {
        const {errors, isValid} = this.processValidationResults(validationResults);
        console.log('Input validation', {inputValue, isValid, errors});
        if (!isValid) {
          this.setValueErrors(errors, inputValue);
          const whenInvalid = this.whenInvalid();
          if (whenInvalid === 'accept') {
            this.model.set(inputValue);
          } else if (typeof whenInvalid === 'object' && 'value' in whenInvalid) {
            this.model.set(whenInvalid.value);
          }
        } else {
          this.setValueErrors(undefined, inputValue);
          this.model.set(inputValue);
          console.log('Value updated', inputValue);
        }
      });
  }

  private initValidityHandler() {
    // @todo properly handle throws in stream
    merge(
      this.value$.pipe(filter(value => value !== this.validatedValue())), // @todo possible race condition on async validators
      toObservable(this.allValidators),
      this.#updateValidity$,
    )
      .pipe(
        takeUntilDestroyed(),
        // Makes validators run async from init and gather multiple sync calls. @todo ???
        //        debounceTime(0),
        switchMap(() => {
          this.setValueErrors('pending', this.value());
          return this.execValidators(this.allValidators(), this.value());
        }),
      )
      .subscribe(validationResults => {
        const {errors, isValid} = this.processValidationResults(validationResults);
        console.log('Validity validation', {value: this.value(), isValid, errors});
        this.setValueErrors(isValid ? undefined : errors, this.value());
      });
  }

  private execValidators(
    validators: FeValidator<any>[],
    value: any,
  ): Observable<FeValidatorResult[]> {
    let syncs: Observable<FeValidatorResult>[] = [];
    let asyncs: Observable<FeValidatorResult>[] = [];
    for (const validator of validators) {
      const res = validator(value, this);
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
      return forkJoin([...syncs, ...asyncs]);
    } else if (syncs.length > 0) {
      return forkJoin([...syncs]);
    } else {
      return of([]);
    }
  }

  private processValidationResults(results: FeValidatorResult[]): {
    errors: FeValidationErrors;
    isValid: boolean;
  } {
    let errors: FeValidationErrors = {};
    for (const result of results) {
      if (result) {
        errors = {
          ...errors,
          ...result,
        };
      }
    }
    const isValid = Object.keys(errors).length === 0;
    return {
      errors,
      isValid,
    };
  }

  private setValueErrors(
    errors: FeValidationErrors | 'pending' | undefined,
    value: VALUE | undefined,
  ) {
    this.valueErrors.set(errors);
    this.validatedValue.set(value);
  }
}
