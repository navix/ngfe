import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FeControl } from '../core';
import { checkNumberErr } from '../util';

@Directive({
  selector: 'input[feNumber],textarea[feNumber]',
})
export class FeNumber {
  constructor(
    private control: FeControl<number | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.inputValue$.subscribe(value => {
      if (value != null) {
        checkNumberErr('FeText', value);
      }
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value == null ? '' : value + '');
    });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    const inputValue = event?.target?.value;
    this.control.input(inputValue !== '' && !isNaN(+inputValue) ? +inputValue : undefined);
  }

  @HostListener('focusout') focusoutHandler() {
    this.control.touch();
  }
}
