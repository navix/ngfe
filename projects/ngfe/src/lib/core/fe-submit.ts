import { Directive, EventEmitter, HostListener, Inject, Optional, Output } from '@angular/core';
import { err } from '../util';
import { FeForm } from './fe-form';

@Directive({
  selector: 'button[feSubmit]',
  exportAs: 'feSubmit',
  standalone: true,
})
export class FeSubmit {
  @Output() feSubmit = new EventEmitter();
  @Output() invalid = new EventEmitter();

  constructor(
    @Optional() @Inject(FeForm) private form: FeForm,
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
    } else {
      this.invalid.emit();
    }
    return false;
  }
}

@Directive({
  selector: 'form[feSubmit]',
  exportAs: 'feSubmit',
  standalone: true,
})
export class FeFormSubmit {
  @Output() feSubmit = new EventEmitter();
  @Output() invalid = new EventEmitter();

  constructor(
    @Inject(FeForm) private group: FeForm,
  ) {
  }

  @HostListener('submit') submitHandler() {
    this.group.touchAll();
    if (this.group.valid) {
      this.feSubmit.emit();
    } else {
      this.invalid.emit();
    }
    return false;
  }
}
