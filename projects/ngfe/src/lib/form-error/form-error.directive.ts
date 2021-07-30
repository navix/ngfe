import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: '[formError],[err]',
})
export class FormErrorDirective implements OnChanges, OnInit, OnDestroy, DoCheck {
  @Input() formError?: string;

  @Input() err?: string;

  private viewRef?: EmbeddedViewRef<any>;

  private destroy = new Subject();

  private controlPath?: string;

  private validatorName?: string;

  constructor(
    private ngForm: NgForm,
    // @todo support formGroup
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const val = this.formError || this.err;
    if (!val) {
      throw new Error('Pass error selector in [err] or [formError]');
    }
    const chunks = val.split(':');
    this.controlPath = chunks[0];
    this.validatorName = chunks[1];
  }

  // @todo optimize, cache, diff
  ngDoCheck() {
    if (!this.controlPath) {
      return;
    }
    const control = this.ngForm.form.get(this.controlPath);
    if (!control) {
      return;
    }
    if (this.validatorName) {
      const err = control.getError(this.validatorName);
      const display = err && control.touched;
      if (!this.viewRef && display) {
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: err });
      }
      if (this.viewRef && !display) {
        this.viewRef.destroy();
        this.viewRef = undefined;
      }
      if (this.viewRef && display) {
        this.viewRef.context = { $implicit: err };
      }
    } else {
      const display = control.errors && control.touched;
      if (!this.viewRef && display) {
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: control.errors });
      }
      if (this.viewRef && !display) {
        this.viewRef.destroy();
        this.viewRef = undefined;
      }
      if (this.viewRef && display) {
        this.viewRef.context = { $implicit: control.errors };
      }
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
