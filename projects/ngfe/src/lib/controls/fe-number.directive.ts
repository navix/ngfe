import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FeControlRef, FeModel } from '../model';
import { checkNumberErr } from '../util';

@Directive({
  selector: 'input[feNumber],textarea[feNumber]',
  providers: [FeControlRef],
})
export class FeNumber {
  constructor(
    private ref: FeControlRef<number | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.ref.value$.subscribe(value => {
      if (value != null) {
        checkNumberErr('FeText', value);
      }
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value == null ? '' : value + '');
    });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    const inputValue = event?.target?.value;
    this.ref.write(inputValue !== '' && !isNaN(+inputValue) ? +inputValue : undefined);
  }

  @HostListener('focusout') focusoutHandler() {
    this.ref.touch();
  }
}
