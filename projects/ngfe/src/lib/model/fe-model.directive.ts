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
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FeForm } from './fe-form.directive';
import { FeModelValidator, FeModelValue } from './meta';

@Directive({
  selector: '[feModel]',
  exportAs: 'feModel',
})
export class FeModel<T = any> implements OnInit, OnChanges, OnDestroy {
  @Input() feModel?: T;

  @Input() name!: string;

  // @todo impl
  @Input() default?: T;

  @Input() validators?: FeModelValidator<T>[];

  // @todo impl - do not register in the form
  @Input() standalone = false;

  @Output() feModelChange = new EventEmitter<T>();

  private _value$ = new BehaviorSubject<FeModelValue<T>>({source: 'INITIAL'});

  private _errors$ = new BehaviorSubject<Map<string, any> | undefined>(undefined);

  private _touched$ = new BehaviorSubject<boolean>(false);

  private _validators: FeModelValidator<T>[] = [];

  constructor(
    @Optional() @Inject(FeForm) public form: FeForm | undefined,
  ) {
    this.form?.models.add(this);
    this.value$.pipe().subscribe(() => {
      this.updateValidity();
    });
  }

  ngOnInit() {
    this
      .value$
      .pipe(
        filter(v => v.source === 'CONTROL'),
        map(v => v.value),
      )
      .subscribe(value => {
        this.feModelChange.emit(value);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.name) {
      throw new Error('feModel should have a name.');
    }
    if ('feModel' in changes) {
      // @todo RLY?
      if (this.feModel === this.value.value) {
        return;
      }
      this.write({
        value: this.feModel,
        source: 'MODEL',
      });
    }
    if ('validators' in changes) {
      const prev: FeModelValidator<T>[] | undefined = changes.validators.previousValue;
      if (prev) {
        this.removeValidators(prev.map(v => v.name));
      }
      if (this.validators) {
        this.addValidators(this.validators);
      }
    }
  }

  ngOnDestroy() {
    this.form?.models.delete(this);
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

  // @todo get displayedErrors$()
  get displayedErrors() {
    return this.touched ? this.errors : undefined;
  }

  get value() {
    return this._value$.value;
  }

  get value$() {
    return this._value$.asObservable();
  }

  get errors() {
    return this._errors$.value;
  }

  get errors$() {
    return this._errors$.asObservable();
  }

  write(value: FeModelValue<T>) {
    this._value$.next(value);
  }

  addValidators(validators: FeModelValidator<T>[]) {
    for (const validator of validators) {
      const currValidator = this.getValidator(validator.name);
      if (currValidator) {
        throw new Error(`Validator with name "${validator.name}" already registered on the model.`);
      }
      this._validators.push(validator);
    }
    this.updateValidity();
  }

  getValidator(name: string) {
    return this._validators.find(v => v.name === name);
  }

  removeValidators(validatorNames: string[]) {
    for (const validatorName of validatorNames) {
      const validatorIndex = this._validators.findIndex(v => v.name === validatorName);
      if (validatorIndex !== -1) {
        this._validators.splice(validatorIndex, 1);
      }
    }
    this.updateValidity();
  }

  // @todo run revalidate after zone tick?
  // @todo update validity for passed names
  updateValidity(validatorNames?: string[]) {
    const errors = new Map<string, any>();
    for (const validator of this._validators) {
      // @todo ASYNC validators
      const error = validator.validator({value: this.value});
      if (error) {
        errors.set(validator.name, error);
      }
    }
    this._errors$.next(errors.size > 0 ? errors : undefined);
  }
}
