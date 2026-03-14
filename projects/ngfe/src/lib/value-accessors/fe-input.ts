import {
  booleanAttribute,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  Renderer2,
} from '@angular/core';
import {FeModel} from '../core/fe-model';
import {ensureNumber} from '../util/ensure-number';

export type FeInputType =
  | 'text'
  | 'color'
  | 'email'
  | 'password'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'time'
  | 'month'
  | 'week'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'datetime-local'
  | 'file'
  | 'hidden'
  | 'button'
  | 'image'
  | 'reset';

const lastInputValueInit = Symbol('lastInputValueInit');

@Directive({
  selector: 'input[model],textarea[model]',
  exportAs: 'input',
})
export class FeInput {
  readonly model = inject(FeModel);
  readonly renderer = inject(Renderer2);
  readonly elementRef = inject(ElementRef);

  /**
   * <input> field type.
   */
  readonly type = input<FeInputType>('text');

  /**
   * Enforce value type that will be set to control.
   * Works only for text-like and number input types.
   * When not set, the value type will be inferred according to input type.
   */
  readonly valueType = input<undefined | 'string' | 'number' | 'boolean' | 'Date'>(undefined);

  readonly name = input<string>();
  readonly value = input<any>();
  readonly updateOn = input<'change' | 'blur'>('change');
  readonly touchOnBlur = input(true, {transform: booleanAttribute});
  readonly touchOnChange = input(false, {transform: booleanAttribute});

  // @todo impl?
  readonly readFileAs = input<'DataURL' | 'Text' | 'ArrayBuffer' | 'BinaryString'>('DataURL');

  readonly fileError = output<string>();

  /**
   * Set to `false` to disconnect from FeControl.
   */
  connected = true;
  lastInputValue: any = lastInputValueInit;

  constructor() {
    // Render value
    effect(() => {
      if (!this.connected) {
        return;
      }
      const value = this.model.value();
      if (this.lastInputValue !== lastInputValueInit && this.lastInputValue === value) {
        return;
      }
      switch (this.type()) {
        case 'checkbox':
          this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
          break;
        case 'radio':
          this.renderer.setProperty(
            this.elementRef.nativeElement,
            'checked',
            this.value() === value,
          );
          break;
        case 'file':
          this.renderer.setProperty(this.elementRef.nativeElement, 'files', value);
          break;
        case 'date':
        case 'datetime-local':
        case 'time':
        case 'month':
        case 'week':
          this.renderer.setProperty(
            this.elementRef.nativeElement,
            'value',
            value instanceof Date
              ? this.type() === 'date'
                ? value.toISOString().substring(0, 10)
                : this.type() === 'datetime-local'
                  ? value.toISOString().substring(0, 16)
                  : this.type() === 'time'
                    ? value.toISOString().substring(11, 16)
                    : this.type() === 'month'
                      ? value.toISOString().substring(0, 7)
                      : this.type() === 'week'
                        ? `${value.getUTCFullYear()}-W${String(
                            Math.ceil(
                              (Date.UTC(
                                value.getUTCFullYear(),
                                value.getUTCMonth(),
                                value.getUTCDate(),
                              ) -
                                Date.UTC(value.getUTCFullYear(), 0, 1)) /
                                86400000,
                            ),
                          ).padStart(2, '0')}`
                        : ''
              : `${value}`,
          );
          break;
        default:
          this.renderer.setProperty(
            this.elementRef.nativeElement,
            'value',
            value == null ? '' : value,
          );
      }
    });
    // Render disabled
    effect(() => {
      if (!this.connected) {
        return;
      }
      const disabled = this.model.disabledWithForm();
      this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', disabled);
    });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    if (!this.connected) {
      return;
    }
    if (this.type() !== 'checkbox' && this.type() !== 'radio' && this.updateOn() === 'change') {
      this.input(event);
    }
  }

  @HostListener('change', ['$event']) changeHandler(event: any) {
    if (!this.connected) {
      return;
    }
    if ((this.type() === 'checkbox' || this.type() === 'radio') && this.updateOn() === 'change') {
      this.input(event);
    }
  }

  @HostListener('focusout', ['$event']) focusoutHandler(event: any) {
    if (!this.connected) {
      return;
    }
    if (this.touchOnBlur()) {
      this.model.touch();
    }
    if (this.updateOn() === 'blur') {
      this.input(event);
    }
  }

  private input(event: any) {
    const valueType = this.valueType();
    switch (this.type()) {
      case 'checkbox':
        this.inputToModel(!!event?.target?.checked);
        break;
      case 'radio':
        this.inputToModel(this.value());
        break;
      case 'file':
        this.inputToModel(event.target.files);
        break;
      case 'number': {
        const value = event?.target?.value;
        if (valueType === 'string') {
          this.inputToModel(`${value}`);
        } else {
          this.inputToModel(ensureNumber(value));
        }
        break;
      }
      default: {
        const value = event?.target?.value;
        if (valueType === 'number') {
          this.inputToModel(ensureNumber(value));
        } else if (valueType === 'Date') {
          const date = value ? new Date(value) : undefined;
          this.inputToModel(isNaN(date as any) ? undefined : date);
        } else if (valueType === 'boolean') {
          this.inputToModel(!!value);
        } else {
          this.inputToModel(value);
        }
      }
    }
    if (this.touchOnChange()) {
      this.model.touch();
    }
  }

  private inputToModel(value: any) {
    this.lastInputValue = value;
    this.model.input(value);
  }
}
