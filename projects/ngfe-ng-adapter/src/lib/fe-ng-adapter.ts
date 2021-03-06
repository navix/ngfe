import { Directive, Inject, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { FeControl, FeInput, FeSelect } from 'ngfe';

@Directive({
  selector: '[feControl]',
})
export class FeNgAdapter {
  constructor(
    @Self() private control: FeControl,
    @Self() @Optional() @Inject(NG_VALUE_ACCESSOR) private ngValueAccessors: ControlValueAccessor[],
    @Self() @Optional() @Inject(NG_VALIDATORS) private ngValidators: Validator[],
    @Self() @Optional() @Inject(NG_ASYNC_VALIDATORS) private ngAsyncValidators: Validator[],
    @Self() @Optional() @Inject(FeInput) private feInputDirective: FeInput | undefined,
    @Self() @Optional() @Inject(FeSelect) private feSelectDirective: FeSelect | undefined,
  ) {
    // @todo use selectValueAccessor
    // https://github.com/angular/angular/blob/3a60063a54d850c50ce962a8a39ce01cfee71398/packages/forms/src/directives/shared.ts#L326
    const va = this.ngValueAccessors?.[0];
    if (va) {
      if (this.feInputDirective) {
        this.feInputDirective.connected = false;
      }
      if (this.feSelectDirective) {
        this.feSelectDirective.connected = false;
      }
      va.registerOnTouched(() => {
        this.control.touch();
      });
      va.registerOnChange((value: any) => {
        this.control.input(value);
      });
      this.control.toInputValue$.subscribe(value => {
        va.writeValue(value);
      });
      if (va.setDisabledState) {
        this.control.disabled$.subscribe(disabled => {
          va.setDisabledState?.(disabled);
        });
      }
    }
    if (this.ngValidators) {
      this.control.updateValidators({
        add: this.ngValidators.map(ngValidator => {
          return ({modelValue}) => {
            return ngValidator.validate({value: modelValue} as any) || undefined;
          };
        }),
      });
    }
  }
}
