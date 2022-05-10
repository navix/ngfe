import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FeModel } from '../model';
import { checkNumberErr } from '../util';

@Directive({
  selector: '[feNumber]',
})
export class FeNumber {
  constructor(
    private model: FeModel<number | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.model.valueToControl$.subscribe(value => {
      console.log('FeNumber:Value', value);
      if (value != null) {
        checkNumberErr('FeText', value);
      }
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value == null ? '' : value + '');
    });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    const inputValue = event?.target?.value;
    this.model.writeFromControl(inputValue !== '' && !isNaN(+inputValue) ? +inputValue : undefined);
  }

  @HostListener('focusout') focusoutHandler() {
    this.model.touched = true;
  }
}
