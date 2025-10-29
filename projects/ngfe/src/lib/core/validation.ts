import {Observable} from 'rxjs';
import {FeModel} from './fe-model';

export type FeValidator<VALUE = any> = (
  value: VALUE | undefined,
  control: FeModel<VALUE>,
) => FeValidatorResult | Promise<FeValidatorResult> | Observable<FeValidatorResult>;

export type FeValidatorResult = undefined | FeValidationErrors;

export type FeValidity = 'pending' | 'valid' | 'invalid';

export type FeValidationErrors = {
  [key: string]: any;
};
