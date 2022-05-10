import { Directive, EventEmitter, HostListener, Inject, Optional, Output } from '@angular/core';
import { err } from '../util';
import { FeForm } from './fe-form.directive';

@Directive({
  selector: 'button[feSubmit]',
})
export class FeButtonSubmitDirective {
  @Output() feSubmit = new EventEmitter();

  constructor(
    @Optional() @Inject(FeForm) private form: FeForm,
  ) {
    if (!this.form) {
      err('FeSubmit', 'Should be used inside <form>.');
    }
  }

  @HostListener('click') clickHandler() {
    this.form.touchAll();
    if (this.form.valid) {
      this.feSubmit.emit();
    }
  }
}

@Directive({
  selector: '[feForm][feSubmit]',
})
export class FeFormSubmit {
  @Output() feSubmit = new EventEmitter();

  constructor(
    @Inject(FeForm) private form: FeForm,
  ) {
  }

  @HostListener('submit') submitHandler() {
    this.form.touchAll();
    if (this.form.valid) {
      this.feSubmit.emit();
    }
  }
}
