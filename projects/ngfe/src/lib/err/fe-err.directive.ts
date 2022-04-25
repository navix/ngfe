import { Directive, DoCheck, EmbeddedViewRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: '[feErr]',
})
export class FeErrDirective implements OnDestroy, DoCheck {
  @Input() feErr?: NgModel;

  private viewRef?: EmbeddedViewRef<any>;

  private destroy = new Subject();

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {
  }

  // @todo optimize, cache, diff
  ngDoCheck() {
    const control = this.feErr?.control;
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
