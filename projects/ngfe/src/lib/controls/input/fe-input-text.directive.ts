import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FeModel } from '../../model';

// @todo use NOT, to catch case where type is not defined and other text-like inputs
// @todo autoresize for textarea and move to separated directive?
@Directive({
  selector: 'input[type="text"][feModel],textarea[feModel]',
})
export class FeInputText {
  /**
   * Set undefined if input is empty ('').
   */
  @Input() forceUndefined = false;

  constructor(
    @Host() private model: FeModel<string>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(filter(v => v.source === 'MODEL'))
      .subscribe(value => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value.value != null ? value.value : '');
      });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    const value = event?.target?.value;
    this.model.write({
      value: value ? value : this.forceUndefined ? undefined : value,
      source: 'CONTROL',
    });
  }

  @HostListener('focusout') focusoutHandler() {
    console.log('FCSOUT');
    this.model.touched = true;
  }
}
