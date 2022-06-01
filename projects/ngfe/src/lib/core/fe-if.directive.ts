import {
  Directive,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { take } from 'rxjs';
import { deepCopy } from '../util';

// @todo improve checking code

@Directive({
  selector: '[feIf]',
})
export class FeIfDirective<T> {
  static ngTemplateGuard_feIf: 'binding';

  static ngTemplateContextGuard<T>(
    dir: FeIfDirective<T>,
    ctx: any,
  ):
    ctx is FeIfContext<Exclude<T, false | 0 | '' | null | undefined>> {
    return true;
  }

  @Input() set feIf(condition: any) {
    this._context.$implicit = this._context.feIf = condition;
    this._if = !!condition;
    this.updateView();
  }

  @Input() ensure?: T;

  @Input() default?: T;

  @Output() ensureChange = new EventEmitter<T | undefined>();

  private _context: FeIfContext<T> = new FeIfContext<T>();
  private _if = false;
  private thenViewRef?: EmbeddedViewRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<FeIfContext<T>>,
    private ngZone: NgZone,
  ) {
  }

  private updateView() {
    if (this._if) {
      if (!this.thenViewRef) {
        if (this.templateRef) {
          if (this.ensure == null && this.default) {
            this.zoneStableRun(() => {
              this.ensureChange.emit(deepCopy(this.default));
              this.thenViewRef = this.viewContainerRef.createEmbeddedView(
                this.templateRef,
                this._context,
              );
            });
          } else {
            this.thenViewRef = this.viewContainerRef.createEmbeddedView(
              this.templateRef,
              this._context,
            );
          }
        }
      }
    } else {
      if (this.thenViewRef) {
        this.viewContainerRef.clear();
        this.thenViewRef = undefined;
        this.zoneStableRun(() => {
          if (this.ensure != null) {
            this.ensureChange.emit(undefined);
          }
        });
      }
    }
  }

  private zoneStableRun(fn: () => void) {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.ngZone.run(() => {
        fn();
      });
    });
  }
}

export class FeIfContext<T = unknown> {
  public $implicit: T = null!;
  public feIf: T = null!;
}
