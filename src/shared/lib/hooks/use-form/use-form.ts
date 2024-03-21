import { useCallback } from 'react';
import { useFormState } from './use-form-state';
import { UseFormEventElements, UseFormProps } from './types';
import { validate } from './utils';

export function useForm<F extends object>(props: UseFormProps<F>) {
    const {
        data,
        setErrors,
        setFields,
        setFieldError,
        setFieldValue,
        setSubmitted,
        setSubmitting,
        resetFields,
    } = useFormState<F>(props);

    const clearValues = useCallback(() => {
        let formData = {} as F;
        for (let [key, val] of Object.entries(data.values)) {
            formData[key as keyof F] = val;
        }
        return formData;
    }, [data.values]);

    const validateFields = useCallback(
        (all = false) => {
            const { errors, hasErrors } = validate(data.values, props, all)!;
            setErrors(errors, all);
            return hasErrors;
        },
        [data.values, data.errors, props.validationSchema, props.validateEmptyField]
    );

    const setFieldValueWrap = <P extends keyof F>(key: P, val: F[P]) => {
        setFieldValue(key, val);
        if (props.validateOnChange) validateFields();
        setFieldError(key, undefined);
    };

    const handleChange = (ev: React.ChangeEvent<UseFormEventElements>) => {
        let { name, value } = ev.target;
        if (name in data.values) {
            setFieldValue(name as keyof F, value as F[keyof F]);
            if (props.validateOnChange) validateFields();
            if (!props.clearErrorOnChange || !data.errors[name as keyof F]) return;
            setFieldError(name as keyof F, undefined);
        }
    };

    const handleSubmit = async (ev?: React.FormEvent<HTMLFormElement>) => {
        ev?.preventDefault();

        if (props.validateOnSubmit) {
            const { errors, hasErrors } = validate(data.values, props, true)!;
            setErrors(errors, true);

            const keys = Object.keys(errors);

            if (keys.length && ev) {
                const target = ev.target as HTMLFormElement;
                const element = target.elements[keys[0] as any];

                if (element) {
                    setTimeout(() => {
                        const top =
                            window.pageYOffset +
                            element.getBoundingClientRect().top -
                            window.innerHeight / 2;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }, 300);
                }
            }

            if(hasErrors) return
        }

        setSubmitting(true);
        const result = props.onSubmit(data.values, { clearValues }, ev);

        if (result && typeof result?.then === 'function' && typeof result?.finally === 'function') {
            result.then(() => setSubmitted(true)).finally(() => setSubmitting(false));
        } else {
            setSubmitted(true);
            setSubmitting(false);
        }
    };

    const handleBlur = (ev: React.ChangeEvent<UseFormEventElements>) => {
        if (props.validateOnBlur) validateFields();
    };

    return {
        setFields,
        setErrors,
        setFieldValue: setFieldValueWrap,
        setFieldError,
        handleChange,
        handleSubmit,
        handleBlur,
        reset: resetFields,
        ...data,
    };
}
