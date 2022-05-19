import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FeAdapter<MODEL, INPUT> {
  toInput: OperatorFunction<MODEL, INPUT>;
  fromInput: OperatorFunction<INPUT, MODEL>;
}

const numberToString: FeAdapter<number | undefined, string> = {
  toInput: obs => obs.pipe(map(value => value == null ? '' : value + '')),
  fromInput: obs => obs.pipe(map(value => value !== '' && !isNaN(+value) ? +value : undefined)),
};

const dateToDateString: FeAdapter<Date | undefined, string> = {
  toInput: obs => obs.pipe(map(value => value == null ? '' : value.toISOString().substring(0, 10))),
  fromInput: obs => obs.pipe(map(value => value !== '' ? new Date(value) : undefined)),
};

const dateToDateLocalString: FeAdapter<Date | undefined, string> = {
  toInput: obs => obs.pipe(map(value => value == null ? '' : value.toISOString().substring(0, 16))),
  fromInput: obs => obs.pipe(map(value => value !== '' ? new Date(value + ':00.000Z') : undefined)),
};

export const feAdapters = {
  numberToString,
  dateToDateString,
  dateToDateLocalString,
} as const;
