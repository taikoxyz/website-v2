export type OptionsFields<T extends object> = {
  [P in keyof T]?: T[P];
}

export type SetFieldValueType<T extends object> = {
  (prop: keyof T, value: T[keyof T]): void;
}

export type SetFieldsType<T extends object> = {
  (fields: OptionsFields<T>): void;
}

export type ObjectStateOutput<T extends object> = [
  T,
  SetFieldsType<T>,
  {
    setStateValue: SetFieldValueType<T>,
    resetState: () => void;
  }
]