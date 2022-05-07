import { Directive, EventEmitter, HostListener, Inject, Optional, Output } from '@angular/core';
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
      throw new Error('FeSubmit should be used inside <form>.');
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
  selector: 'form[feSubmit]',
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
