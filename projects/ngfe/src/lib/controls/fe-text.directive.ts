import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { FeControl } from '../core';
import { checkStringErr } from '../util';

@Directive({
  selector: 'input[feText],textarea[feText]',
})
export class FeTextDirective {
  @Input() updateOn: 'change' | 'blur' = 'change';

  // @todo readonly?: boolean;

  constructor(
    private control: FeControl<string | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.inputValue$.subscribe(value => {
      if (value != null) {
        checkStringErr('FeText', value);
        // @todo show message about other controls that can fit better
      }
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value == null ? '' : value);
    });
  }

  @HostBinding('attr.disabled') get disabled() {
    return this.control.disabled || null;
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    if (this.updateOn === 'change') {
      this.control.input(event?.target?.value);
    }
  }

  @HostListener('focusout', ['$event']) focusoutHandler(event: any) {
    if (this.updateOn === 'blur') {
      this.control.input(event?.target?.value);
    }
    this.control.touch();
  }
}
