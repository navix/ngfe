import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import {FeModel} from '../core/fe-model';

export type FeSelectCompareFn = (value1: any, value2: any) => boolean;

const optionValueInit = Symbol('optionValueInit');

@Directive({
  selector: 'select[model]',
  exportAs: 'select',
})
export class FeSelect {
  control = inject(FeModel);
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);

  readonly multiple = input(false, {transform: booleanAttribute});
  readonly updateOn = input<'change' | 'blur'>('change');
  readonly touchOnBlur = input(true, {transform: booleanAttribute});
  readonly touchOnChange = input(false, {transform: booleanAttribute});
  readonly compareFn = input<FeSelectCompareFn>((v1, v2) => v1 === v2);

  readonly options = new Set<FeSelectOption>();

  connected = true;

  #value: any[] = [undefined];

  constructor() {
    // Render inputValue
    effect(() => {
      if (!this.connected) {
        return;
      }
      const value = this.control.value();
      this.#value = Array.isArray(value) ? value : [value];
      this.bindValue();
    });
    // Render disabled
    effect(() => {
      if (!this.connected) {
        return;
      }
      const disabled = this.control.disabledWithForm();
      this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', disabled);
    });
  }

  @HostListener('change') inputHandler() {
    if (!this.connected) {
      return;
    }
    this.options.forEach(option => option.checkSelected());
    if (this.updateOn() === 'change') {
      this.input();
    }
  }

  bindValue() {
    if (!this.connected) {
      return;
    }
    if (this.multiple()) {
      this.options.forEach(option => {
        if (this.#value.find(v => this.compareFn()(v, option.value()))) {
          option.selected.set(true);
        } else {
          option.selected.set(false);
        }
      });
    } else {
      const selected = Array.from(this.options)
        .filter(option => option.value() !== optionValueInit)
        .find(option => this.compareFn()(this.#value[0], option.value()));
      if (selected) {
        selected.selected.set(true);
        // Select other selected to false
        this.options.forEach(option => {
          if (option !== selected) {
            option.selected.set(false);
          }
        });
      } else {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
        this.renderer.setProperty(this.elementRef.nativeElement, 'selectedIndex', '-1');
      }
    }
  }

  @HostListener('focusout') focusoutHandler() {
    if (!this.connected) {
      return;
    }
    if (this.touchOnBlur()) {
      this.control.touch();
    }
    if (this.updateOn() === 'blur') {
      this.input();
    }
  }

  private input() {
    if (this.multiple()) {
      this.control.input(
        Array.from(this.options)
          .filter(o => o.selected() && o.value())
          .map(o => o.value()!),
      );
    } else {
      const selected = Array.from(this.options).find(o => o.selected());
      this.control.input(selected !== undefined ? selected.value() : undefined);
    }
    if (this.touchOnChange()) {
      this.control.touch();
    }
  }
}

@Directive({
  selector: 'option',
  exportAs: 'option',
})
export class FeSelectOption implements OnInit, OnChanges, OnDestroy {
  select = inject(FeSelect, {optional: true});
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);

  readonly value = input<any>(optionValueInit);

  readonly selected = signal<boolean | string | undefined>(undefined);

  constructor() {
    if (!this.select) {
      return;
    }
    this.select.options.add(this);
    // Render selected
    effect(() => {
      const selected = this.selected();
      if (!this.select) {
        return;
      }
      if (selected !== this.domSelected) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'selected', selected);
      }
    });
  }

  ngOnInit() {
    if (!this.select) {
      return;
    }
    // Browser could auto-set value to select after rendering options, need to update state.
    this.select.bindValue();
  }

  // @todo use effect ??
  ngOnChanges() {
    if (!this.select) {
      return;
    }
    this.select.bindValue();
  }

  ngOnDestroy() {
    if (!this.select) {
      return;
    }
    this.select.options.delete(this);
    this.select.bindValue();
  }

  get domSelected() {
    return this.elementRef.nativeElement.selected;
  }

  checkSelected() {
    this.selected.set(this.domSelected);
  }
}
