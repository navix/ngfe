import { Injectable, OnDestroy, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { err } from '../util';
import { FeModel } from './fe-model.directive';

@Injectable()
export class FeControlRef<T> implements OnDestroy {
  private fromControlValue?: T;
  private destroy = new Subject();

  constructor(
    @Optional() public readonly model: FeModel<T>,
  ) {
    if (!this.model) {
      throw err('FeControlRef', 'Control should be used inside OR on element with [feModel].');
    }
    this.model.controlRefs.add(this);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
    this.model.controlRefs.delete(this);
  }

  get value$() {
    return this.model.value$.pipe(
      takeUntil(this.destroy),
      filter(value => value !== this.fromControlValue),
    );
  }

  write(value: T) {
    this.fromControlValue = value;
    this.model.write(value, {
      fromControl: true,
      markAsDirty: true,
    });
  }

  touch() {
    this.model.touched = true;
  }
}
