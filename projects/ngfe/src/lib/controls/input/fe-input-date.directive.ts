import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FeModel } from '../../model';

@Directive({
  selector: 'input[type="date"][feModel]',
})
export class FeInputDate {
  /**
   * Convert input from/to Date object.
   */
  @Input() jsDate = false;

  constructor(
    @Host() private model: FeModel<string | Date>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(filter(v => v.source === 'MODEL'))
      .subscribe(value => {
        const v = this.jsDate
          ? (value instanceof Date) ? value.toISOString().substring(0, 10) : ''
          : value.value != null ? value.value : '';
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', v);
      });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    const value = event?.target?.value;
    this.model.write({
      value: this.jsDate
        ? !!value ? new Date(value) : undefined
        : value,
      source: 'CONTROL',
    });
  }

  @HostListener('focusout') focusoutHandler() {
    this.model.touched = true;
  }
}
