import { UseFormErrors, UseFormProps } from './../types';
import * as yup from 'yup';

const t = yup.object({});

export const validate = function <F extends object>(
    values: F,
    props: UseFormProps<F>,
    isValidateAllFields = false
) {
    let hasErrors = false;

    if (!props.validationSchema) return;
    let validationErrors = {} as UseFormErrors<F>;
    let validateAllFields = isValidateAllFields || !!props.validateEmptyField;

    try {
        props.validationSchema.validateSync(values, { abortEarly: false });
    } catch (err) {
        let typeErr = err as yup.ValidationError;
        for (let { path, message, value } of typeErr.inner) {
            if (validateAllFields || value !== '') {
                validationErrors[path as keyof typeof validationErrors] = message;
                hasErrors = true;
            }
        }
    }
    return {
        errors: validationErrors,
        hasErrors,
    };
};
