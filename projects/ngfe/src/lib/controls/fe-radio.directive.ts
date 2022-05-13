import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FeControlRef } from '../model';
import { err, isString } from '../util';

@Directive({
  selector: 'input[type="radio"][feRadio]',
  providers: [FeControlRef],
})
export class FeRadio implements OnChanges {
  @Input() value!: string;

  constructor(
    private ref: FeControlRef<string | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.ref.value$.pipe(
        filter(value => this.value === value),
      )
      .subscribe(() => {
        // @todo check 2 radios with same name and value
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', true);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('value' in changes) {
      if (this.value == null) {
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

  @HostListener('change', ['$event']) inputHandler(event: any) {
    if (event?.target?.checked) {
      this.ref.write(this.value);
    }
  }

  // @todo touch on focusout & click
}
