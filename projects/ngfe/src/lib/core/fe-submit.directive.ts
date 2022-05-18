import { Directive, EventEmitter, HostListener, Inject, Optional, Output } from '@angular/core';
import { err } from '../util';
import { FeGroupDirective } from './fe-group.directive';

@Directive({
  selector: 'button[feSubmit]',
  exportAs: 'feSubmit',
})
export class FeButtonSubmitDirective {
  @Output() feSubmit = new EventEmitter();

  constructor(
    @Optional() @Inject(FeGroupDirective) private group: FeGroupDirective,
  ) {
    if (!this.group) {
      err('FeButtonSubmitDirective', 'Should be used inside element with [feGroup].');
    }
  }

  @HostListener('click') clickHandler() {
    this.group.touchAll();
    if (this.group.valid) {
      this.feSubmit.emit();
    }
  }
}

@Directive({
  selector: 'form[feGroup][feSubmit]',
})
export class FeFormSubmitDirective {
  @Output() feSubmit = new EventEmitter();

  constructor(
    @Inject(FeGroupDirective) private group: FeGroupDirective,
  ) {
  }

  @HostListener('submit') submitHandler() {
    this.group.touchAll();
    if (this.group.valid) {
      this.feSubmit.emit();
    }
  }
}
