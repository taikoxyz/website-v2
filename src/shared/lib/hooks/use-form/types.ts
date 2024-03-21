import * as yup from 'yup';

export type UseFormEventElements = HTMLInputElement | HTMLTextAreaElement;

export type UseFormErrors<F extends object> = {
  [P in keyof F]?: string | null | undefined;
};

export type UseFormFields<F extends object> = {
  [P in keyof F]?: F[P];
};

export type UseFormProps<F extends object> = {
  initialValues: F;
  validateEmptyField?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnSubmit?: boolean;
  validationSchema?: yup.ObjectSchema<any>;
  clearErrorOnChange?: boolean;
  onSubmit: UseFormSubmitHandler<F>;
};

export type UseFormSubmitHandlerData<F extends object> = {
  clearValues: () => F;
};

export type UseFormData<F extends object> = {
  values: F;
  errors: UseFormErrors<F>;
  submitted: boolean;
  isSubmitting: boolean;
};

// Handlers
export type UseFormSubmitHandler<F extends object> = {
  (
    values: F,
    data: UseFormSubmitHandlerData<F>,
    event?: React.FormEvent<HTMLFormElement>
  ): Promise<void> | void;
};
export type ChangeDataFn<F extends object> = {
  (prop: keyof UseFormData<F>, val: UseFormData<F>[keyof UseFormData<F>]): void;
};
