export interface FeAdapter<MODEL, INPUT> {
  toInput: (value: MODEL) => INPUT;
  fromInput: (value: INPUT) => MODEL;
}

const feNumberStringAdapter: FeAdapter<number | undefined, string> = {
  toInput(value) {
    return value == null ? '' : value + '';
  },
  fromInput(value) {
    return value !== '' && !isNaN(+value) ? +value : undefined;
  },
};

const feDateToStringAdapter: FeAdapter<Date | undefined, string> = {
  toInput(value) {
    return value == null ? '' : value.toISOString().substring(0, 10);
  },
  fromInput(value) {
    return value !== '' ? new Date(value) : undefined;
  },
};

const feDateLocalToStringAdapter: FeAdapter<Date | undefined, string> = {
  toInput(value) {
    return value == null ? '' : value.toISOString().substring(0, 16);
  },
  fromInput(value) {
    return value !== '' ? new Date(value + ':00.000Z') : undefined;
  },
};

export const feAdapters = {
  numberToString: feNumberStringAdapter,
  dateToDateString: feDateToStringAdapter,
  dateToDateLocalString: feDateLocalToStringAdapter,
} as const;
