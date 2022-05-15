import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { map } from 'rxjs/operators';
import { FeControl } from '../core';
import { checkStringErr } from '../util';

@Directive({
  selector: 'input[type="date"][feDate]',
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
    private control: FeControl<string | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .control
      .inputValue$
      .pipe(
        map(value => value == null ? '' : value),
      )
      .subscribe(value => {
        checkStringErr('FeDate', value);
        this.value = value;
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
      });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    this.value = event?.target?.value;
    this.control.input(this.value);
  }

  @HostListener('focusout') focusoutHandler() {
    this.control.touched = true;
  }
}
