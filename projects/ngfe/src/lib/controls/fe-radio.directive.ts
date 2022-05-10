import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FeModel } from '../model';
import { err, isString } from '../util';

@Directive({
  selector: 'input[type="radio"]',
})
export class FeRadio implements OnDestroy, OnChanges {
  @Input() value!: string;

  private checked = '';

  private destroy$ = new Subject();

  constructor(
    @Host() private model: FeModel<string>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    if (!this.model) {
      return;
    }
    this
      .model
      .value$
      .pipe(
        takeUntil(this.destroy$),
        filter(value => this.value === value),
      )
      .subscribe(() => {
        // @todo check 2 radios with same name and value
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', true);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.model) {
      return;
    }
    if ('value' in changes) {
      if (!this.value) {
        err('FeRadio', '<radio> [value] should be defined.');
      }
      if (!isString(this.value)) {
        err('FeRadio', '<radio> [value] should be a string.');
      }
    }
    if ('checked' in changes) {
      err('FeRadio', 'Do not bind [checked], set value to [feModel].');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    if (!this.model) {
      return;
    }
    if (event?.target?.checked) {
      this.model.write(this.value);
    }
  }

  // @todo touch on focusout & click
}
