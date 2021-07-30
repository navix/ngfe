import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'err',
})
export class ErrPipe implements PipeTransform {
  transform(value: ValidationErrors, ...args: unknown[]): unknown {
    const messages: string[] = [];

    if (value?.required) {
      messages.push('Required.');
    }

    if (value?.evErr) {
      messages.push('EV Err.');
    }

    return messages.join(' ');
  }
}
