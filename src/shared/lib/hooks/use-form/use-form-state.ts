import { useCallback, useState } from 'react';
import { ChangeDataFn, UseFormData, UseFormErrors, UseFormFields, UseFormProps } from './types';

export function useFormState<F extends object>(props: UseFormProps<F>) {
  const [data, setData] = useState<UseFormData<F>>({
    errors: {},
    values: props.initialValues,
    isSubmitting: false,
    submitted: false,
  });

  const changeData: ChangeDataFn<F> = (prop, val) => {
    setData((prev) => ({ ...prev, [prop]: val }));
  };

  const setErrors = (errors: UseFormErrors<F>, clear = false) => {
    changeData('errors', { ...(clear ? ({} as UseFormErrors<F>) : data.errors), ...errors });
  };

  const setFieldError = function <P extends keyof F>(key: P, val: string | null | undefined) {
    changeData('errors', { ...data.errors, [key]: val });
  };

  const setFields = (fields: UseFormFields<F>, clear = false) => {
    changeData('values', { ...(clear ? ({} as F) : data.values), ...fields });
  };

  const setFieldValue = function <P extends keyof F>(key: P, val: F[P]) {
    changeData('values', { ...data.values, [key]: val });
  };

  const setSubmitted = (bool: boolean) => {
    changeData('submitted', bool);
  };

  const setSubmitting = (bool: boolean) => {
    changeData('isSubmitting', bool);
  };

  const resetFields = useCallback(() => {
    setFields(JSON.parse(JSON.stringify(props.initialValues)));
  }, [props.initialValues]);

  return {
    setErrors,
    setFields,
    changeData,
    data,
    resetFields,
    setSubmitting,
    setSubmitted,
    setFieldError,
    setFieldValue,
  };
}
