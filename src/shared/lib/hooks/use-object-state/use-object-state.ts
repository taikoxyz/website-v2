import { useState, useCallback } from "react";
import { ObjectStateOutput, SetFieldValueType, SetFieldsType } from "./types";

export function useObjectState<T extends object>(values: T): ObjectStateOutput<T> {
  const [data, setData] = useState(values);

  const setStateValue: SetFieldValueType<T> = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const setState: SetFieldsType<T> = (fields) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const resetState = useCallback(() => {
    setState(JSON.parse(JSON.stringify(data)));
  }, [values]);

  return [data, setState, { setStateValue, resetState }];
}