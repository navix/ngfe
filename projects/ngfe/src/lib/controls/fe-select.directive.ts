import {
  Directive,
  ElementRef, Host,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { FeModel } from '../model';
import { isString, checkStringErr } from '../util';

@Directive({
  selector: 'select[feModel]',
})
export class FeSelect {
  // @todo impl
  @Input() emptyToUndefined = false;

  options = new Set<FeSelectOption>();

  private value = '';

  constructor(
    @Host() private model: FeModel<string>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(filter(value => value !== this.value))
      .subscribe(value => {
        checkStringErr('FeSelect', value);
        this.value = value;
        this.bindValue();
      });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    this.value = event?.target?.value || '';
    this.model.write(this.value);
  }

  bindValue() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.value);
  }

  @HostListener('focusout') focusoutHandler() {
    this.model.touched = true;
  }
}

@Directive({
  selector: 'option',
})
export class FeSelectOption implements OnInit, OnChanges, OnDestroy {
  @Input() value?: string;

  @Input() selected?: any;

  constructor(
    @Optional() private select: FeSelect,
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
    if ('value' in changes) {
      if (this.value !== undefined && !isString(this.value)) {
        throw new Error('FeSelectOption: <option> [value] should be a string.');
      }
    }
    if ('selected' in changes) {
      throw new Error('FeSelectOption: Do not bind [selected], set value to [feModel] on <select>.');
    }
  }

  ngOnDestroy() {
    if (!this.select) {
      return;
    }
    this.select.options.delete(this);
    this.select.bindValue();
  }
}
