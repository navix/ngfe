import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { FeControl } from '../core';
import { coerceToBoolean } from '../util';

@Directive({
  selector: 'input[feControl],textarea[feControl]',
  exportAs: 'feInput',
  standalone: true,
})
export class FeInput {
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

  @Input() set touchOnBlur(touchOnBlur: boolean | string) {
    this._touchOnBlur = coerceToBoolean(touchOnBlur);
  }

  @Input() set touchOnChange(touchOnChange: boolean | string) {
    this._touchOnChange = coerceToBoolean(touchOnChange);
  }

  @Input() readFileAs: 'DataURL' | 'Text' | 'ArrayBuffer' | 'BinaryString' = 'DataURL';

  @Output() fileError = new EventEmitter<string>();

  /**
   * Set to `false` to disconnect from FeControl.
   */
  connected = true;

  private _touchOnBlur = true;
  private _touchOnChange = false;

  constructor(
    private control: FeControl,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.control.toInputValue$.subscribe(value => {
      if (!this.connected) {
        return;
      }
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
      if (!this.connected) {
        return;
      }
      this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', disabled);
    });
  }

  @HostListener('input', ['$event']) inputHandler(event: any) {
    if (!this.connected) {
      return;
    }
    if (this.type !== 'checkbox' && this.type !== 'radio' && this.updateOn === 'change') {
      this.input(event);
    }
  }

  @HostListener('change', ['$event']) changeHandler(event: any) {
    if (!this.connected) {
      return;
    }
    if ((this.type === 'checkbox' || this.type === 'radio') && this.updateOn === 'change') {
      this.input(event);
    }
  }

  @HostListener('focusout', ['$event']) focusoutHandler(event: any) {
    if (!this.connected) {
      return;
    }
    if (this._touchOnBlur) {
      this.control.touch();
    }
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
      case 'number':
        const value = event?.target?.value;
        this.control.input(value !== '' ? parseFloat(value) : undefined);
        break;
      default:
        this.control.input(event?.target?.value);
    }
    if (this._touchOnChange) {
      this.control.touch();
    }
  }
}
