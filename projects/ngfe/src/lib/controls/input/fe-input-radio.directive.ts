import { Directive, ElementRef, Host, HostListener, Input, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FeModel } from '../../model';

@Directive({
  selector: 'input[type="radio"][feModel]',
})
export class FeInputRadio {
  @Input() value?: any;

  constructor(
    @Host() private model: FeModel,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(filter(v => v.source === 'MODEL'))
      .subscribe(value => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value.value === this.value);
      });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    const checked = event?.target?.checked;
    if (checked) {
      this.model.write({
        value: this.value,
        source: 'CONTROL',
      });
    }
  }
}
