import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FeControlRef } from '../model';

@Directive({
  selector: 'input[type="checkbox"][feCheckbox]',
  providers: [FeControlRef],
})
export class FeCheckbox {
  constructor(
    private ref: FeControlRef<boolean | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.ref.value$.subscribe(value => {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
    });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    this.ref.write(!!event?.target?.checked);
  }

  // @todo prevent bind [checked]
  // @todo touch on focusout & click
}
