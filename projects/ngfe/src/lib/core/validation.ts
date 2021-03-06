import { Observable } from 'rxjs';
import { FeControl } from './fe-control';

/**
 * Returns `undefined` for valid values.
 */
export type FeValidator<MODEL = any, INPUT = any> = (control: FeControl<MODEL, INPUT>)
  => FeValidatorResult | Promise<FeValidatorResult> | Observable<FeValidatorResult>;

export type FeValidatorResult = undefined | FeErrors;

export type FeValidity = 'initial' | 'pending' | 'valid' | 'invalid';

export type FeErrors = {
  [key: string]: any;
}
