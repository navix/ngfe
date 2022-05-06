import { Directive, ElementRef, Host, HostListener, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FeModel } from '../../model';

@Directive({
  selector: 'input[type="checkbox"][feModel]',
})
export class FeInputCheckbox {
  constructor(
    @Host() private model: FeModel<boolean>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .model
      .value$
      .pipe(filter(v => v.source === 'MODEL'))
      .subscribe(value => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', !!value.value);
      });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    const checked = event?.target?.checked;
    this.model.write({
      value: checked,
      source: 'CONTROL',
    });
  }
}
