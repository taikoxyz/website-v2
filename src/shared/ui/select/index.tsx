import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useClickOutside } from 'shared/lib/hooks/use-click-outside';
import Sprite from '../sprite';
import css from './select.module.scss';

export interface SelectItem {
    name: string | number;
    value: string | number | object;
}

export interface SelectProps<T extends SelectItem> {
    options: T[];
    value: T | null;
    placeholder?: string;
    classNames?: {
        root?: string;
        input?: string;
        valueContainer?: string;
        value?: string;
        list?: string;
        listItem?: string;
        listItemActive?: string;
        defaultText?: string;
    };
    defaultText?: string;
    disabled?: boolean;
    inputValue?: string;
    disableInput?: boolean;
    onChangeInput?: (value: string) => void;
    onChange: (data: T | null) => void;
}

export const Select = function <T extends SelectItem>({
    classNames,
    value,
    onChange,
    options,
    disabled,
    disableInput,
    placeholder,
    inputValue,
    defaultText,
    onChangeInput,
}: SelectProps<T>) {
    const [active, setActive] = useState(false);
    const [search, setSearch] = useState(typeof value?.name === 'string' ? value.name : '');
    const ref = useClickOutside(() => setActive(false));

    const changeInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let val = ev.target.value;
        // if (value) val = '';
        setSearch(val);
        onChangeInput && onChangeInput(val);
        onChange && !val && onChange(null);
    };

    const changeItem = (item: T) => {
        setSearch(item.name.toString());
        setActive(false);
        onChangeInput && onChangeInput(item.value.toString());
        onChange && onChange(item);
    };

    const filterOptions = useMemo(() => {
        if (disableInput) return options;

        const controlValue = inputValue || search;

        if (controlValue.trim() === '') return options;
        if (controlValue === value?.name) return options;

        return options.filter((o) =>
            o.name.toString().toLowerCase().includes(controlValue.toLowerCase())
        );
    }, [inputValue, search, options, disableInput, active, value]);

    useEffect(() => {
        if (value === null) setSearch('');
    }, [value]);

    return (
        <div
            className={clsx(
                css.root,
                classNames?.root,
                active && filterOptions.length > 0 && css.rootActive,
                disabled && css.rootDisabled
            )}
            data-class="select"
            ref={ref as any}
        >
            <div
                className={clsx(css.valueContainer, classNames?.valueContainer)}
                onClick={() => !disabled && setActive(!active)}
                data-class="select-container"
            >
                {defaultText && (
                    <p className={clsx(css.defaultText, classNames?.defaultText)}>
                        {defaultText}
                    </p>
                )}
                {!disableInput && (
                    <input
                        className={clsx(css.input, classNames?.input)}
                        value={search}
                        onChange={changeInput}
                        placeholder={placeholder || 'Value...'}
                        disabled={disabled}
                        data-class="select-input"
                        type="text"
                    />
                )}

                {disableInput && (
                    <>
                        {value?.value && (
                            <p className={clsx(css.value, classNames?.value)}>
                                {value.name}
                            </p>
                        )}
                        {!value?.value && (
                            <p className={css.placeholder}>{placeholder || 'Select...'}</p>
                        )}
                    </>
                )}
                <Sprite.Default className={css.arrowIcon} icon="arrow-right-small" />
            </div>

            {!disabled && active && filterOptions.length > 0 && (
                <ul className={clsx(css.list, classNames?.list)}>
                    {filterOptions.map((item) => (
                        <li
                            className={clsx(
                                css.list_item,
                                classNames?.listItem,
                                item.value === value?.value && [
                                    css.list_itemActive,
                                    classNames?.listItemActive,
                                ]
                            )}
                            onClick={() => changeItem(item)}
                            key={item.value.toString()}
                        >
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
