import { deepCopy } from '../util';

export interface FeAdapter<MODEL, INPUT> {
  name?: string;
  fromModel: (modelValue: MODEL) => INPUT;
  fromInput: (inputValue: INPUT) => MODEL;
}

const noop: FeAdapter<any, any> = {
  name: 'noop',
  fromModel: modelValue => modelValue,
  fromInput: inputValue => inputValue,
};

const numberToString: FeAdapter<number | undefined, string> = {
  name: 'numberToString',
  fromModel: modelValue => modelValue == null ? '' : modelValue + '',
  fromInput: inputValue => inputValue !== '' && !isNaN(+inputValue) ? +inputValue : undefined,
};

const dateToDateString: FeAdapter<Date | undefined, string> = {
  name: 'dateToDateString',
  fromModel: modelValue => modelValue == null ? '' : modelValue.toISOString().substring(0, 10),
  fromInput: (inputValue) => {
    if (inputValue === '') {
      return undefined;
    }
    const date = new Date(inputValue);
    return isValidDateObject(date) ? date : undefined;
  },
};

const dateToDateLocalString: FeAdapter<Date | undefined, string> = {
  name: 'dateToDateLocalString',
  fromModel: modelValue => modelValue == null ? '' : modelValue.toISOString().substring(0, 16),
  fromInput: (inputValue) => {
    if (inputValue === '') {
      return undefined;
    }
    const date = new Date(inputValue + ':00.000Z');
    return isValidDateObject(date) ? date : undefined;
  },
};

const deepCopyAdapter: FeAdapter<any, any> = {
  name: 'deepCopy',
  fromModel: modelValue => deepCopy(modelValue),
  fromInput: inputValue => deepCopy(inputValue),
};

export const feAdapters = {
  noop,
  numberToString,
  dateToDateString,
  dateToDateLocalString,
  deepCopy: deepCopyAdapter,
} as const;

function isValidDateObject(d: any): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
}
