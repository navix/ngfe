import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errors'
})
export class ErrorsPipe implements PipeTransform {
  transform(value: ValidationErrors, ...args: unknown[]): unknown {
    return JSON.stringify(value);
  }
}
