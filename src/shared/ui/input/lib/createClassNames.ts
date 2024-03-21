import { ClassValue } from 'clsx';
import { InputClasses } from '../types';
import css from '../ui/input/input.module.scss';

interface ClassNamesArray {
    root: ClassValue[];
    input: ClassValue[];
    field: ClassValue[];
    title: ClassValue[];
    error: ClassValue[];
    placeholder: ClassValue[];
}

export const createClassNames = (className?: string | InputClasses) => {
    const classNames: ClassNamesArray = {
        root: [css.root],
        input: [css.input],
        field: [css.field],
        title: [css.title],
        error: [css.error],
        placeholder: [css.placeholder]
    };

    if (!className) {
        return classNames;
    } else if (typeof className === 'string') {
        classNames.root.push(className);
    } else {
        classNames.root.push(className.root);
        classNames.input.push(className.input);
        classNames.field.push(className.field);
        classNames.title.push(className.title);
        classNames.error.push(className.error);
        classNames.placeholder.push(className.placeholder)
    }

    return classNames;
};
