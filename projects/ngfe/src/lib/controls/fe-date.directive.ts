import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { FeModel } from '../model';
import { checkStringErr } from '../util';

@Directive({
  selector: 'input[type="date"][feModel]',
})
export class FeDate {
  /**
   * Convert input from/to Date object.
   */
    // @todo impl ??? or create middleware tooling?
  @Input() jsDate = false;

  // @todo emptyToUndefined

  private value = '';

  constructor(
    @Host() private model: FeModel<string | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(
        map(value => value == null ? '' : value),
        filter(value => value !== this.value),
      )
      .subscribe(value => {
        checkStringErr('FeDate', value);
        this.value = value;
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
      });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    this.value = event?.target?.value;
    this.model.write(this.value);
  }

  @HostListener('focusout') focusoutHandler() {
    this.model.touched = true;
  }
}
