import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs/operators';
import { coerceToBoolean, err } from '../util';
import { FeAdapter, feAdapters } from './adapters';
import { FeControl } from './fe-control';
import { FeErrors, FeValidator, FeValidity } from './validation';

/**
 * Allow to bind model to control.
 * Provides `FeControl` service to handle control state and communications.
 */
@Directive({
  selector: '[feControl],[feControlChange]',
  exportAs: 'feControl',
  providers: [FeControl],
})
export class FeControlDirective<MODEL, INPUT> implements OnChanges {
  @Input() feControl!: MODEL | undefined;

  @Input() set disabled(disabled: boolean | string) {
    this.control.disabled = coerceToBoolean(disabled);
  }

  @Input() set standalone(standalone: boolean | string) {
    this.control.standalone = coerceToBoolean(standalone);
  }

  @Input() set touched(touched: boolean) {
    this.control.touched = touched;
  }

  @Input() set dirty(dirty: boolean) {
    this.control.dirty = dirty;
  }

  @Input() set debounce(debounce: number | undefined) {
    this.control.debounce = debounce;
  }

  @Input() set adapter(adapter: keyof typeof feAdapters | FeAdapter<MODEL, INPUT> | undefined) {
    if (typeof adapter === 'string') {
      if (adapter in feAdapters) {
        this.control.adapter = feAdapters[adapter];
      } else {
        err('FeControlDirective', `Adapter with name "${this.adapter}" not found.`);
      }
    } else {
      this.control.adapter = adapter;
    }
  }

  @Input() extraValidators?: FeValidator<MODEL>[];
  // @todo `[extraErrors]` input with custom errors that will be merged to the state.

  @Output() feControlChange = new EventEmitter<MODEL>();
  @Output() disabledChange = new EventEmitter<boolean>();
  @Output() standaloneChange = new EventEmitter<boolean>();
  @Output() touchedChange = new EventEmitter<boolean>();
  @Output() dirtyChange = new EventEmitter<boolean>();
  @Output() validityChange = new EventEmitter<FeValidity>();
  @Output() errorsChange = new EventEmitter<FeErrors | undefined>();
  @Output() destroy = new EventEmitter<undefined>();

  constructor(
    public control: FeControl,
  ) {
    this.control.modelValue$
      .pipe(filter(value => this.feControl !== value))
      .subscribe(value => {
        this.feControl = value;
        this.feControlChange.emit(value);
      });
    this.control.disabled$
      .subscribe(disabled => {
        this.disabledChange.emit(disabled);
      });
    this.control.standalone$
      .subscribe(standalone => {
        this.standaloneChange.emit(standalone);
      });
    this.control.touched$
      .subscribe(touched => {
        this.touchedChange.emit(touched);
      });
    this.control.dirty$
      .subscribe(dirty => {
        this.dirtyChange.emit(dirty);
      });
    this.control.validity$
      .subscribe(validity => {
        this.validityChange.emit(validity);
      });
    this.control.errors$
      .subscribe(errors => {
        this.errorsChange.emit(errors);
      });
    this.control.destroy$.subscribe(this.destroy);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('feControl' in changes) {
      this.control.update(this.feControl);
    }
    if ('extraValidators' in changes) {
      const prev: FeValidator<MODEL>[] | undefined = changes.extraValidators.previousValue;
      this.control.updateValidators({
        add: this.extraValidators,
        remove: prev?.filter(f => this.extraValidators?.indexOf(f) === -1) || [],
      });
    }
  }

  get modelValue() {
    return this.control.modelValue;
  }

  get inputValue() {
    return this.control.inputValue;
  }

  get touched() {
    return this.control.touched;
  }

  get touched$() {
    return this.control.touched$;
  }

  get dirty() {
    return this.control.dirty;
  }

  get dirty$() {
    return this.control.dirty$;
  }

  get disabled() {
    return this.control.disabled;
  }

  get disabled$() {
    return this.control.disabled$;
  }

  get validity() {
    return this.control.validity;
  }

  get validity$() {
    return this.control.validity$;
  }

  get invalid() {
    return this.control.invalid;
  }

  get invalid$() {
    return this.control.invalid$;
  }

  get pending() {
    return this.control.pending;
  }

  get pending$() {
    return this.control.pending$;
  }

  get valid() {
    return this.control.valid;
  }

  get valid$() {
    return this.control.valid$;
  }

  get errors() {
    return this.control.errors;
  }

  get errors$() {
    return this.control.errors$;
  }

  get visibleErrors() {
    return this.control.visibleErrors;
  }

  get visibleErrors$() {
    return this.control.visibleErrors$;
  }
}
