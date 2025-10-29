import {Directive, HostListener, inject, output} from '@angular/core';
import {FeForm} from './fe-form';

@Directive({
  selector: 'button[anySubmit],button[validSubmit],button[invalidSubmit]',
  exportAs: 'submit',
})
export class FeSubmit {
  readonly form = inject(FeForm, {optional: true});

  readonly anySubmit = output<boolean>();
  readonly validSubmit = output();
  readonly invalidSubmit = output();

  constructor() {
    if (!this.form) {
      throw new Error('SfSubmit should be used inside FeForm.');
    }
  }

  @HostListener('click') clickHandler() {
    const form = this.form!;
    const valid = form.valid();
    form.touchAll();
    this.anySubmit.emit(valid);
    if (valid) {
      this.validSubmit.emit();
    } else {
      this.invalidSubmit.emit();
    }
    return false;
  }
}

@Directive({
  selector: 'form[anySubmit],form[validSubmit],form[invalidSubmit]',
  exportAs: 'submit',
})
export class FeFormSubmit {
  readonly form = inject(FeForm);

  readonly anySubmit = output<boolean>();
  readonly validSubmit = output();
  readonly invalidSubmit = output();

  @HostListener('submit') submitHandler() {
    const valid = this.form.valid();
    this.form.touchAll();
    this.anySubmit.emit(valid);
    if (valid) {
      this.validSubmit.emit();
    } else {
      this.invalidSubmit.emit();
    }
    return false;
  }
}
