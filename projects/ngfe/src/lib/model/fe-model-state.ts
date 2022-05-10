import { FeErrors, FeValidator } from './fe-validator';

export interface FeModelState<T> {
  value: T | symbol;
  valueFromControl?: T;
  touched: boolean;
  dirty: boolean;
  validators: FeValidator<T>[];
  validity: 'initial' | 'pending' | 'valid' | 'invalid';
  errors: FeErrors;
}
