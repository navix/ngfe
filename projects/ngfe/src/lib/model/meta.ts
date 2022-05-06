export interface FeModelValue<T> {
  value?: T;
  source: 'INITIAL' | 'MODEL' | 'CONTROL';
}

export interface FeModelValidator<T> {
  name: string;
  validator: (args: {value: FeModelValue<T>}) => undefined | any;
}

export interface FeModelError {
  name: string;
  error: any;
}
