import { isNumber } from './is-number';
import { isString } from './is-string';

export function err(
  component: string,
  message: string,
) {
  throw new Error(`${component}: ${message}`);
}

export function checkStringErr(
  component: string,
  value: any,
) {
  if (!isString(value)) {
    err(component, 'Model value should be a string, ${typeof value} "${value}" passed.');
  }
}

export function checkNumberErr(
  component: string,
  value: any,
) {
  if (!isNumber(value)) {
    err(component, 'Model value should be a number, ${typeof value} "${value}" passed.');
  }
}
