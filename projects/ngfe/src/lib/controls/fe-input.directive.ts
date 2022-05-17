import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: 'input[feInput],textarea[feInput]',
})
export class FeInputDirective {
  @Input() type:
    'text' | 'color' | 'email' | 'password' | 'range' | 'search' | 'tel' | 'url' | 'time' | 'month' | 'week' |
    'number' |
    'checkbox' |
    'radio' |
    'date' | 'datetime-local' |
    'file' |
    'hidden' | 'button' | 'image' | 'reset' = 'text';

  @Input() name?: string;

  @Input() value?: any;

  @Input() updateOn: 'change' | 'blur' = 'change';

  // @todo readonly?: boolean;

  constructor(
    private control: FeControl,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.inputValue$.subscribe(value => {
      let inputValue = value;
      switch (this.type) {
        case 'checkbox':
          this.renderer.setProperty(this.elementRef.nativeElement, 'checked', inputValue);
          break;
        case 'radio':
          this.renderer.setProperty(this.elementRef.nativeElement, 'checked', this.value === inputValue);
          break;
        default:
          this.renderer.setProperty(this.elementRef.nativeElement, 'value', inputValue == null ? '' : inputValue);
      }
    });
  }

  @HostBinding('attr.disabled') get disabled() {
    return this.control.disabled || null;
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    console.log('ev.INPUT', event);
    if (this.type !== 'checkbox' && this.type !== 'radio' && this.updateOn === 'change') {
      this.input(event);
    }
  }

  @HostListener('change', ['$event']) changeHandler(event: any) {
    console.log('ev.CHANGE', event);
    if ((this.type === 'checkbox' || this.type === 'radio') && this.updateOn === 'change') {
      this.input(event);
    }
  }

  @HostListener('focusout', ['$event']) focusoutHandler(event: any) {
    if (this.updateOn === 'blur') {
      this.input(event);
    }
    this.control.touch();
  }

  private input(event: any) {
    switch (this.type) {
      case 'checkbox':
        this.control.input(!!event?.target?.checked);
        break;
      case 'radio':
        this.control.input(this.value);
        break;
      default:
        this.control.input(event?.target?.value);
    }
  }
}
