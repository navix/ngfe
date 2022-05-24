import { Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[feEnsure]',
})
export class FeEnsureDirective<T> implements OnChanges, OnDestroy {
  @Input() feEnsure!: T | undefined;
  @Input() default?: T;

  @Output() feEnsureChange = new EventEmitter<T | undefined>();
  @Output() init = new EventEmitter<T | undefined>();
  @Output() destroy = new EventEmitter<T | undefined>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('feEnsure', this.feEnsure, this.default);
    if (this.feEnsure == null) {
      this.init.emit(this.default);
      if (this.default != null) {
        this.feEnsureChange.emit(this.default);
      }
    }
  }

  ngOnDestroy() {
    if (this.feEnsure != null) {
      this.destroy.emit(this.feEnsure);
      this.feEnsureChange.emit(undefined);
    }
  }
}
