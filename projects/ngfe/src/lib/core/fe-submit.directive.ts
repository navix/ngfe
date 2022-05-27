import { Directive, EventEmitter, HostListener, Inject, Optional, Output } from '@angular/core';
import { err } from '../util';
import { FeFormDirective } from './fe-form.directive';

@Directive({
  selector: 'button[feSubmit]',
  exportAs: 'feSubmit',
})
export class FeButtonSubmitDirective {
  @Output() feSubmit = new EventEmitter();

  constructor(
    @Optional() @Inject(FeFormDirective) private form: FeFormDirective,
  ) {
    if (!this.form) {
      // @todo allow formSubmit to work outside form
      err('FeButtonSubmitDirective', 'Should be used inside form or element with [feForm].');
    }
  }

  @HostListener('click') clickHandler() {
    this.form.touchAll();
    if (this.form.valid) {
      this.feSubmit.emit();
    }
    return false;
  }
}

@Directive({
  selector: 'form[feSubmit]',
})
export class FeFormSubmitDirective {
  @Output() feSubmit = new EventEmitter();

  constructor(
    @Inject(FeFormDirective) private group: FeFormDirective,
  ) {
  }

  @HostListener('submit') submitHandler() {
    this.group.touchAll();
    if (this.group.valid) {
      this.feSubmit.emit();
    }
  }
}
