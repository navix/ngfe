import { Observable } from 'rxjs';

export type FeValidator<T> = (args: {value: T}) => FeValidatorResult | Promise<FeValidatorResult> | Observable<FeValidatorResult>;

export type FeValidatorResult = void | undefined | FeErrors;

export type FeErrors = {
  [key: string]: any;
}
