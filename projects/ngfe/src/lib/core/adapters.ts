import { deepCopy } from '../util';

export interface FeAdapter<MODEL, INPUT> {
  name?: string;
  fromModel: (modelValue: MODEL) => INPUT;
  fromInput: (inputValue: INPUT) => MODEL;
}

const noop: FeAdapter<any, any> = {
  name: 'noop',
  fromModel: value => value,
  fromInput: value => value,
};

const numberToString: FeAdapter<number | undefined, string> = {
  name: 'numberToString',
  fromModel: value => value == null ? '' : value + '',
  fromInput: value => value !== '' && !isNaN(+value) ? +value : undefined,
};

const dateToDateString: FeAdapter<Date | undefined, string> = {
  name: 'dateToDateString',
  fromModel: value => value == null ? '' : value.toISOString().substring(0, 10),
  fromInput: value => value !== '' ? new Date(value) : undefined,
};

const dateToDateLocalString: FeAdapter<Date | undefined, string> = {
  name: 'dateToDateLocalString',
  fromModel: value => value == null ? '' : value.toISOString().substring(0, 16),
  fromInput: value => value !== '' ? new Date(value + ':00.000Z') : undefined,
};

const deepCopyAdapter: FeAdapter<any, any> = {
  name: 'deepCopy',
  fromModel: value => deepCopy(value),
  fromInput: value => deepCopy(value),
};

export const feAdapters = {
  noop,
  numberToString,
  dateToDateString,
  dateToDateLocalString,
  deepCopy: deepCopyAdapter,
} as const;
