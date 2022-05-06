import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FeModel } from '../../fe-model.directive';

@Directive({
  selector: 'select[feModel]',
})
export class FeSelectDirective {
  constructor(
    private feModel: FeModel<string>,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this
      .feModel
      .value$
      .pipe(filter(v => v.source === 'MODEL'))
      .subscribe(value => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', value.value != null ? value.value : '');
      });
  }

  @HostListener('change', ['$event']) inputHandler(event: any) {
    const value = event?.target?.value;
    this.feModel.write({
      value: value,
      source: 'CONTROL',
    });
  }
}
