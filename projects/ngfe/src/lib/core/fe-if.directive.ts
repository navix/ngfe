import {
  Directive,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, switchMap, take } from 'rxjs';
import { map } from 'rxjs/operators';
import { coerceToBoolean, deepCopy } from '../util';

@Directive({
  selector: '[feIf]',
})
export class FeIfDirective<T> implements OnChanges {
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
    this._updateCall$.next(undefined);
  }

  @Input() ensure?: T;

  @Input() default?: T;

  @Input() set force(force: boolean | string) {
    this._force = coerceToBoolean(force);
  }

  @Output() ensureChange = new EventEmitter<T | undefined>();

  private _context: FeIfContext<T> = new FeIfContext<T>();
  private _if = false;
  private _force = false;
  private _updateCall$ = new Subject<undefined>();
  private thenViewRef?: EmbeddedViewRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<FeIfContext<T>>,
    private ngZone: NgZone,
  ) {
    this._updateCall$.pipe(
      switchMap(args => this.ngZone.onStable.pipe(take(1), map(() => args))),
    ).subscribe(() => {
      this.ngZone.run(() => {
        if (!this._if) {
          if (this.thenViewRef) {
            this.viewContainerRef.clear();
            this.thenViewRef = undefined;
            this.ensureChange.emit(undefined);
          }
        } else {
          if (!this.thenViewRef) {
            if (!this.ensure && this.default) {
              this.ensureChange.emit(deepCopy(this.default));
            }
            this.thenViewRef = this.viewContainerRef.createEmbeddedView(
              this.templateRef,
              this._context,
            );
          } else if (this._force && this.default && !this.ensure) {
            this.ensureChange.emit(deepCopy(this.default));
          }
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('ensure' in changes || 'force' in changes) {
      this._updateCall$.next(undefined);
    }
  }
}

export class FeIfContext<T = unknown> {
  public $implicit: T = null!;
  public feIf: T = null!;
}
