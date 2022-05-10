import { Directive, ElementRef, Host, HostListener, Renderer2 } from '@angular/core';
import { FeModel } from '../model';
import { checkStringErr } from '../util';

@Directive({
  selector: '[feText]',
})
export class FeText {
  // @todo updateOn: 'change' | 'blur'

  constructor(
    @Host() private model: FeModel<string | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .valueToControl$
      .subscribe(value => {
        console.log('FeText:Value', value);
        if (value != null) {
          checkStringErr('FeText', value);
          // @todo show message about other controls that can fit better
        }
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value == null ? '' : value);
      });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    this.model.writeFromControl(event?.target?.value);
  }

  @HostListener('focusout') focusoutHandler() {
    this.model.touched = true;
  }
}
