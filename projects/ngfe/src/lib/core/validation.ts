import { Observable } from 'rxjs';

export type FeValidator<MODEL = any, INPUT = any> = (args: {modelValue: MODEL, inputValue?: INPUT})
  => FeValidatorResult | Promise<FeValidatorResult> | Observable<FeValidatorResult>;

export type FeValidatorResult = void | undefined | FeErrors;

export type FeValidity = 'initial' | 'pending' | 'valid' | 'invalid';

export type FeErrors = {
  [key: string]: any;
}
