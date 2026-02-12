import {computed, Directive, HostBinding, input, model, output, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {FeModel} from './fe-model';
import {FeValidity} from './validation';

export type FeFormValue = Record<string, any>;

@Directive({
  selector: 'form:not([noForm]),[feForm]',
  exportAs: 'form',
})
export class FeForm {
  readonly name = input<string>();

  readonly disabled = model(false);

  readonly modelValueChange = output<FeFormValue>();
  readonly validityChange = output<FeValidity>();

  readonly #controlsMap = signal<FeModel[]>([]);

  readonly controls = computed(() => [...this.#controlsMap()]);
  readonly enabledControls = computed(() =>
    this.controls().filter(control => !control.disabledWithForm()),
  );

  readonly value = computed<FeFormValue>(() => {
    const value: {[key: string]: any} = {};
    let nonameIndex = 0;
    this.enabledControls().forEach(control => {
      let name = control.name();
      let duplicated = false;
      if (name && name in value) {
        duplicated = true;
        name = undefined;
      }
      const key = name || `noname_${nonameIndex}`;
      value[key] = control.value();
      if (!name) {
        nonameIndex++;
      }
      if (duplicated) {
        console.warn(
          `Duplicate control name "${name}" in form "${this.name()}" - this control's value will be available under "${key}" key.`,
        );
      }
    });
    return value;
  });
  readonly value$ = toObservable(this.value);

  readonly pending = computed(() => this.enabledControls().some(m => m.pending()));
  readonly pending$ = toObservable(this.pending);
  readonly valid = computed(() => this.enabledControls().every(m => m.valid()));
  readonly valid$ = toObservable(this.valid);
  readonly invalid = computed(() => this.enabledControls().some(m => m.invalid()));
  readonly invalid$ = toObservable(this.invalid);
  readonly touched = computed(() => this.enabledControls().some(m => m.touched()));
  readonly touched$ = toObservable(this.touched);
  readonly dirty = computed(() => this.enabledControls().some(m => m.dirty()));
  readonly dirty$ = toObservable(this.dirty);
  readonly validity = computed<FeValidity>(() =>
    this.pending() ? 'pending' : this.invalid() ? 'invalid' : 'valid',
  );
  readonly validity$ = toObservable(this.validity);

  @HostBinding('attr.novalidate') novalidate = '';

  constructor() {
    this.value$.subscribe(modelValue => this.modelValueChange.emit(modelValue));
    this.validity$.subscribe(validity => this.validityChange.emit(validity));
  }

  touchAll() {
    this.enabledControls().forEach(m => m.touch());
  }

  reset() {
    this.controls().forEach(m => m.reset());
  }

  /**
   * @internal
   */
  addControl(control: FeModel) {
    if (!this.#controlsMap().includes(control)) {
      this.#controlsMap.set([...this.#controlsMap(), control]);
    }
  }

  /**
   * @internal
   */
  removeControl(control: FeModel) {
    if (this.#controlsMap().includes(control)) {
      this.#controlsMap.set(this.#controlsMap().filter(c => c !== control));
    }
  }
}
