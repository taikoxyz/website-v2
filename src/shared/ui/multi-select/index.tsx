import clsx from 'clsx';
import React from 'react';
import css from './multi-select.module.scss';

export interface SelectItem {
    value: string | number | object;
    name: string | number;
    deactivated?: boolean;
}

interface MultiSelectProps<T> {
    values: T[];
    options: T[];
    onChange: (data: T[], current: T) => void;
    className?: string | {
        root?: string;
        list?: string;
        item?: string;
        itemDeactivate?: string;
        itemActive?: string;
    };
    disabled?: boolean;
    renderElement?: (item: T, active?: boolean) => JSX.Element;
}

export const MultiSelect = function<T extends SelectItem>({
    onChange,
    options,
    values,
    className,
    disabled,
    renderElement,
}: MultiSelectProps<T>) {
    const clss = typeof className === 'object' ? className : { root: className };

    const inList = (item: T) => values.findIndex(o => o.value === item.value) !== -1;

    const changeValues = (item: T) => {
        const data = inList(item) 
            ? values.filter(o => o.value !== item.value)
            : [...values, item];

        onChange(data, item);
    }

    return (
        <div className={clsx(
                css.root, 
                clss.root,
                disabled && css.root_disabled
            )}>
            <ul className={clsx(css.list, clss.list)}>
                {options.map((item) => (
                    <li 
                        className={clsx(
                            css.list_item,
                            clss.item,
                            item.deactivated && [css.list_itemDeactivate, clss.itemDeactivate],
                            inList(item) && [css.list_itemActive, clss.itemActive]
                        )}
                        onClick={() => !disabled && !item.deactivated && changeValues(item)}
                        key={typeof item.value === 'object' ? item.name : item.value}
                    >
                        {renderElement 
                            ? renderElement(item, inList(item)) 
                            : <span>{item.name}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
}