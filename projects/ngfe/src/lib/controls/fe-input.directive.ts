import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { FeControl } from '../core';

@Directive({
  selector: 'input[feControl],textarea[feControl]',
  exportAs: 'feInput',
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

  @Input() readFileAs: 'DataURL' | 'Text' | 'ArrayBuffer' | 'BinaryString' = 'DataURL';

  @Output() fileError = new EventEmitter<string>();

  constructor(
    private control: FeControl,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.toInputValue$.subscribe(value => {
      let inputValue = value;
      switch (this.type) {
        case 'checkbox':
          this.renderer.setProperty(this.elementRef.nativeElement, 'checked', inputValue);
          break;
        case 'radio':
          this.renderer.setProperty(this.elementRef.nativeElement, 'checked', this.value === inputValue);
          break;
        case 'file':
          this.renderer.setProperty(this.elementRef.nativeElement, 'files', inputValue);
          break;
        default:
          this.renderer.setProperty(this.elementRef.nativeElement, 'value', inputValue == null ? '' : inputValue);
      }
    });
    this.control.disabled$.subscribe(disabled => {
      this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', disabled);
    });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    if (this.type !== 'checkbox' && this.type !== 'radio' && this.updateOn === 'change') {
      this.input(event);
    }
  }

  @HostListener('change', ['$event']) changeHandler(event: any) {
    if ((this.type === 'checkbox' || this.type === 'radio') && this.updateOn === 'change') {
      this.input(event);
    }
  }

  @HostListener('focusout', ['$event']) focusoutHandler(event: any) {
    this.control.touch();
    if (this.updateOn === 'blur') {
      this.input(event);
    }
  }

  private input(event: any) {
    switch (this.type) {
      case 'checkbox':
        this.control.input(!!event?.target?.checked);
        break;
      case 'radio':
        this.control.input(this.value);
        break;
      case 'file':
        this.control.input(event.target.files);
        break;
      default:
        this.control.input(event?.target?.value);
    }
  }
}
