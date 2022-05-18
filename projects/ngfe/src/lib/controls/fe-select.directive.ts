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
import { coerceToBoolean, err } from '../util';

@Directive({
  selector: 'select[feSelect]',
  exportAs: 'feSelect',
})
export class FeSelectDirective {
  @Input() multiple?: boolean | string;

  @Input() updateOn: 'change' | 'blur' = 'change';

  options = new Set<FeSelectOptionDirective>();
  private _value: any[] = [undefined];

  constructor(
    private control: FeControl,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.inputValue$.subscribe(value => {
      this._value = Array.isArray(value) ? value : [value];
      this.bindValue();
    });
  }

  get isMultiple() {
    return coerceToBoolean(this.multiple);
  }

  @HostListener('change') inputHandler() {
    if (this.updateOn === 'change') {
      this.input();
    }
  }

  bindValue() {
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
    this.control.touch();
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
  }
}

@Directive({
  selector: 'option[feOption]',
})
export class FeSelectOptionDirective implements OnInit, OnChanges, OnDestroy {
  @Input() value?: any;

  constructor(
    private select: FeSelectDirective,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    if (!this.select) {
      err('FeSelectOptionDirective', 'Should be used only on select with [feSelect].');
    }
    this.select.options.add(this);
  }

  ngOnInit() {
    // Browser could auto-set value to select after rendering options, need to update state.
    this.select.bindValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.select.bindValue();
  }

  ngOnDestroy() {
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
