import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { FeControlRef } from '../model';
import { checkStringErr } from '../util';

@Directive({
  selector: 'input[feText],textarea[feText]',
  providers: [FeControlRef],
})
export class FeText {
  @Input() updateOn: 'change' | 'blur' = 'change';

  constructor(
    private ref: FeControlRef<string | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.ref.value$.subscribe(value => {
      if (value != null) {
        checkStringErr('FeText', value);
        // @todo show message about other controls that can fit better
      }
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value == null ? '' : value);
    });
  }

  @HostBinding('attr.disabled') get disabled() {
    return this.ref.model.disabled || null;
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    if (this.updateOn === 'change') {
      this.ref.write(event?.target?.value);
    }
  }

  @HostListener('focusout', ['$event']) focusoutHandler(event: any) {
    if (this.updateOn === 'blur') {
      this.ref.write(event?.target?.value);
    }
    this.ref.touch();
  }
}
