import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FeModel } from '../model';

@Directive({
  selector: 'input[type="checkbox"][feCheckbox]',
})
export class FeCheckbox {
  constructor(
    private model: FeModel<boolean | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .valueToControl$
      .subscribe(value => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
      });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    this.model.write(!!event?.target?.checked);
  }

  // @todo prevent bind [checked]
  // @todo touch on focusout & click
}
