import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: 'input[type="checkbox"][feCheckbox]',
})
export class FeCheckbox {
  constructor(
    private control: FeControl<boolean | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.inputValue$.subscribe(value => {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
    });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    this.control.input(!!event?.target?.checked);
  }

  // @todo prevent bind [checked]
  // @todo touch on focusout & click
}
