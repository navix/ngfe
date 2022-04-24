import { Directive, DoCheck, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: '[err]',
})
export class FormErrorDirective implements OnDestroy, DoCheck {
  @Input() err?: NgModel;

  private viewRef?: EmbeddedViewRef<any>;

  private destroy = new Subject();

  constructor(
    private ngForm: NgForm,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {
  }

  // @todo optimize, cache, diff
  ngDoCheck() {
    const control = this.err?.control;
    if (!control) {
      return;
    }
    const display = control.errors && control.touched;
    if (!this.viewRef && display) {
      this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, {$implicit: control.errors});
      return;
    }
    if (this.viewRef && !display) {
      this.viewRef.destroy();
      this.viewRef = undefined;
      return;
    }
    if (this.viewRef && display) {
      this.viewRef.context = {$implicit: control.errors};
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
