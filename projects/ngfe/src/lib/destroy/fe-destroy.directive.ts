import { Directive, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[feDestroy]',
})
export class FeDestroyDirective implements OnDestroy {
  @Output() feDestroy = new EventEmitter<void>();

  ngOnDestroy() {
    this.feDestroy.emit();
  }
}
