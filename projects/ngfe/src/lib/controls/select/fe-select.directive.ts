import {
  Directive,
  ElementRef,
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
import { FeModel } from '../../model';

@Directive({
  selector: 'select[feModel]',
})
export class FeSelect {
  options = new Set<FeSelectOption>();

  constructor(
    private model: FeModel<string>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(filter(v => v.source === 'MODEL'))
      .subscribe(value => {
        if ((typeof value.value !== 'string') && value.value != null) {
          throw new Error(`FeSelect: model value should be empty or a string, ${typeof value.value} "${value.value}" passed.`);
        }
        this.bindValue();
      });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    const value = event?.target?.value;
    this.model.write({
      value: value,
      source: 'CONTROL',
    });
  }

  bindValue() {
    const v = this.model.value.value != null ? this.model.value.value : null;
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', v);
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
      if (this.value !== undefined && (typeof this.value !== 'string')) {
        throw new Error('FeSelectOption: <option> [value] should be a string.');
      }
    }
    if ('selected' in changes) {
      throw new Error('FeSelectOption: Do not bind [selected], set value in [feModel] on <select>.');
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
