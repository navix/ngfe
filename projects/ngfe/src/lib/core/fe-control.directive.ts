import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs/operators';
import { coerceToBoolean, err } from '../util';
import { FeAdapter, feAdapters } from './adapters';
import { FeControl } from './fe-control';
import { FeErrors, FeValidator, FeValidity } from './validation';

@Directive({
  selector: '[feControl]',
  exportAs: 'feControl',
  providers: [FeControl],
})
export class FeControlDirective<MODEL, INPUT> implements OnChanges {
  @Input() feControl!: MODEL;
  @Input() disabled: boolean | string = false;
  @Input() standalone: boolean | string = false;
  @Input() touched = false;
  @Input() dirty = false;
  @Input() extraValidators?: FeValidator<MODEL>[];
  @Input() debounce?: number;
  @Input() adapter?: keyof typeof feAdapters | FeAdapter<MODEL, INPUT>;

  @Output() feControlChange = new EventEmitter<MODEL>();
  @Output() disabledChange = new EventEmitter<boolean>();
  @Output() standaloneChange = new EventEmitter<boolean>();
  @Output() touchedChange = new EventEmitter<boolean>();
  @Output() dirtyChange = new EventEmitter<boolean>();
  @Output() validityChange = new EventEmitter<FeValidity>();
  @Output() errorsChange = new EventEmitter<FeErrors | undefined>();
  @Output() destroy = new EventEmitter<undefined>();

  constructor(
    private control: FeControl,
  ) {
    this.control.value$
      .pipe(filter(value => this.feControl !== value))
      .subscribe(value => {
        this.feControl = value;
        this.feControlChange.emit(value);
      });
    this.control.disabled$
      .pipe(filter(disabled => this.disabled !== disabled))
      .subscribe(disabled => {
        this.disabled = disabled;
        this.disabledChange.emit(disabled);
      });
    this.control.standalone$
      .pipe(filter(standalone => this.standalone !== standalone))
      .subscribe(standalone => {
        this.standalone = standalone;
        this.standaloneChange.emit(standalone);
      });
    this.control.touched$
      .pipe(filter(touched => this.touched !== touched))
      .subscribe(touched => {
        this.touched = touched;
        this.touchedChange.emit(touched);
      });
    this.control.dirty$
      .pipe(filter(dirty => this.dirty !== dirty))
      .subscribe(dirty => {
        this.dirty = dirty;
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
    if ('adapter' in changes) {
      if (typeof this.adapter === 'string') {
        if (this.adapter in feAdapters) {
          this.control.adapter = feAdapters[this.adapter];
        } else {
          err('FeControlDirective', `Adapter with name "${this.adapter}" not found.`);
        }
      } else {
        this.control.adapter = this.adapter;
      }
    }
    if ('disabled' in changes) {
      this.control.disabled = coerceToBoolean(this.disabled);
    }
    if ('standalone' in changes) {
      this.control.standalone = coerceToBoolean(this.standalone);
    }
    if ('touched' in changes) {
      this.control.touched = this.touched;
    }
    if ('dirty' in changes) {
      this.control.dirty = this.dirty;
    }
    if ('extraValidators' in changes) {
      const prev: FeValidator<MODEL>[] | undefined = changes.extraValidators.previousValue;
      this.control.updateValidators({
        add: this.extraValidators,
        remove: prev?.filter(f => this.extraValidators?.indexOf(f) === -1) || [],
      });
    }
    if ('debounce' in changes) {
      this.control.debounce = this.debounce || 0;
    }
    if ('feControl' in changes) {
      this.control.updateValue(this.feControl);
    }
  }

  get value() {
    return this.control.value;
  }

  get validity() {
    return this.control.validity;
  }

  get invalid() {
    return this.control.invalid;
  }

  get pending() {
    return this.control.pending;
  }

  get valid() {
    return this.control.valid;
  }

  get errors() {
    return this.control.errors;
  }

  get visibleErrors() {
    return this.control.visibleErrors;
  }
}