import { Directive, ElementRef, Host, HostListener, Renderer2 } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { FeModel } from '../model';

@Directive({
  selector: 'input[type="checkbox"][feModel]',
})
export class FeCheckbox {
  private value = false;

  constructor(
    @Host() private model: FeModel<boolean | undefined>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(
        map(value => !!value),
        filter(value => value !== this.value),
      )
      .subscribe(value => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
      });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    this.value = event?.target?.checked;
    this.model.write(this.value);
  }

  // @todo prevent bind [checked]
  // @todo touch on focusout & click
}
