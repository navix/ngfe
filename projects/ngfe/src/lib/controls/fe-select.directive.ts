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
import { checkStringErr, err } from '../util';

@Directive({
  selector: 'select[feSelect]',
})
export class FeSelect {
  options = new Set<FeSelectOption>();

  constructor(
    private control: FeControl<string | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.inputValue$.subscribe(value => {
      if (value != null) {
        checkStringErr('FeSelect', value);
      }
      this.bindValue();
    });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    this.control.input(event?.target?.value || '');
  }

  bindValue() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.control.value);
  }

  @HostListener('focusout') focusoutHandler() {
    this.control.touch();
  }
}

@Directive({
  selector: 'option[feOption]',
})
export class FeSelectOption implements OnInit, OnChanges, OnDestroy {
  @Input() value?: string;

  @Input() selected?: any;

  constructor(
    private select: FeSelect,
  ) {
    if (!this.select) {
      err('FeOption', 'Should be used only on select with [feSelect].');
    }
    this.select.options.add(this);
  }

  ngOnInit() {
    // Browser could auto-set value to select after rendering options, need to update state.
    this.select.bindValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('value' in changes) {
      if (this.value != null) {
        checkStringErr('FeOption', this.value);
      }
    }
    if ('selected' in changes) {
      err('FeOption', 'Do not bind [selected], set value to [feModel] on <select>.');
    }
  }

  ngOnDestroy() {
    this.select.options.delete(this);
    this.select.bindValue();
  }
}
