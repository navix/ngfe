import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FeControl } from '../core';
import { coerceToBoolean } from '../util';

@Directive({
  selector: 'select[feControl]',
  exportAs: 'feSelect',
})
export class FeSelectDirective {
  @Input() multiple?: boolean | string;

  @Input() updateOn: 'change' | 'blur' = 'change';

  @Input() set touchOnBlur(touchOnBlur: boolean | string) {
    this._touchOnBlur = coerceToBoolean(touchOnBlur);
  }

  @Input() set touchOnChange(touchOnChange: boolean | string) {
    this._touchOnChange = coerceToBoolean(touchOnChange);
  }

  readonly options = new Set<FeSelectOptionDirective>();

  connected = true;

  private _value: any[] = [undefined];
  private _touchOnBlur = true;
  private _touchOnChange = false;

  constructor(
    private control: FeControl,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.toInputValue$.subscribe(value => {
      if (!this.connected) {
        return;
      }
      this._value = Array.isArray(value) ? value : [value];
      this.bindValue();
    });
    this.control.disabled$.subscribe(disabled => {
      this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', disabled);
    });
  }

  get isMultiple() {
    return coerceToBoolean(this.multiple);
  }

  @HostListener('change') inputHandler() {
    if (!this.connected) {
      return;
    }
    if (this.updateOn === 'change') {
      this.input();
    }
  }

  bindValue() {
    if (!this.connected) {
      return;
    }
    if (this.isMultiple) {
      this.options.forEach(option => {
        if (this._value.find(v => v === option.value)) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
    } else {
      const selected = Array.from(this.options).find(o => o.value === this._value[0]);
      if (selected) {
        selected.selected = true;
      } else {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
      }
    }
  }

  @HostListener('focusout') focusoutHandler() {
    if (!this.connected) {
      return;
    }
    if (this._touchOnBlur) {
      this.control.touch();
    }
    if (this.updateOn === 'blur') {
      this.input();
    }
  }

  private input() {
    if (this.isMultiple) {
      this.control.input(Array.from(this.options).filter(s => s.selected && s.value).map(s => s.value!));
    } else {
      const selected = Array.from(this.options).find(o => o.selected);
      this.control.input(selected !== undefined ? selected.value : undefined);
    }
    if (this._touchOnChange) {
      this.control.touch();
    }
  }
}

@Directive({
  selector: 'option',
})
export class FeSelectOptionDirective implements OnInit, OnChanges, OnDestroy {
  @Input() value?: any;

  constructor(
    private select: FeSelectDirective,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    if (!this.select) {
      return;
    }
    this.select.options.add(this);
  }

  ngOnInit() {
    if (!this.select) {
      return;
    }
    // Browser could auto-set value to select after rendering options, need to update state.
    this.select.bindValue();
  }

  ngOnChanges(changes: SimpleChanges) {
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

  get selected() {
    return this.elementRef.nativeElement.selected;
  }

  @Input() set selected(selected: boolean) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'selected', selected);
  }
}
