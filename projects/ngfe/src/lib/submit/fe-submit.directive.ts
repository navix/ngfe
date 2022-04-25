import { ChangeDetectorRef, Directive, HostListener, OnDestroy, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Touch all form's fields for proper errors displaying.
 *
 *
 * ### Usage
 *
 * ```html
 * <form ...>
 *   ...
 *   <button feSubmit ...>Submit</button>
 * </form>
 * ```
 */
@Directive({
  selector: '[feSubmit]',
})
export class FeSubmitDirective implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    @Optional() private container: ControlContainer,
  ) {
  }

  ngOnInit(): void {
    if (this.ngForm) {
      const form = this.ngForm.form;
      this.ngForm.ngSubmit
        .pipe(
          takeUntil(this.destroy),
        )
        .subscribe(() => {
          this.formTouchAll(form);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get ngForm(): NgForm | undefined {
    if (this.container && this.container.formDirective) {
      return this.container.formDirective as NgForm;
    }
    return undefined;
  }

  @HostListener('click') clickHandler() {
    if (this.ngForm) {
      this.formTouchAll(this.ngForm.form);
    } else {
      throw new Error('Use uiFormSubmit inside NgForm or FormGroup');
    }
  }

  /**
   * Touches all FormGroup controls and controls in nested FormGroups at any level.
   */
  formTouchAll(form: FormGroup, revalidate?: boolean) {
    form.markAsTouched();
    for (const i in form.controls) {
      if (form.controls.hasOwnProperty(i)) {
        const control = form.controls[i];
        if (control) {
          control.markAsTouched();
          if (control instanceof FormGroup) {
            this.formTouchAll(control);
          } else if (revalidate) {
            control.setValue(control.value);
          }
        }
      }
    }
    this.cdr.detectChanges();
  }
}
