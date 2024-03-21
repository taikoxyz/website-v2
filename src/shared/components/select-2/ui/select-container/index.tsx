import React, { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { ISelectDefaultItem, ISelectProps } from '../../types';
import { getTextWidthMax } from '../../lib';
import { useSelect } from '../../provider';
import arrow_asset from '../../assets/arrow-down.svg';
import css from './select-container.module.scss';

export const SelectContainer = <T extends ISelectDefaultItem | object>({
    disabled,
    placeholder,
    disabledInput,
    inputValue,
    value,
    renderName,
    onChangeInput,
    options,
    classNames,
    render,
}: ISelectProps<T>) => {
    const valueContainerRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);
    const { state, setState } = useSelect();

    const valueName = useMemo(
        () => value ? (value as any)[renderName!] : null, 
        [value]
    );

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        let val = ev.target.value;

        setState({ inputValue: val });
        onChangeInput?.(val);
    };

    const onBlur = () => {
        setState({ inputValue: valueName || '' });
    };

    const onToggle = () => {
        if(!disabled) {
            setState({ active: !state.active })
        }
    }

    useEffect(() => {
        setState({
            inputValue: 
                value !== null
                    ? valueName
                    : ''
        });
    }, [value]);

    useEffect(() => {
        if (valueRef.current && valueContainerRef.current) {
            const text = options.map((item) => (item as any)[renderName!]);

            valueContainerRef.current.style.width = 
                `${getTextWidthMax(text, valueRef.current) + 16}px`;
        }
    }, [options]);

    return (
        <div
            className={clsx(
                css.container, 
                classNames?.container || css.container_default
            )}
            onClick={onToggle}
            data-select="container"
        >
            <div
                className={clsx(
                    css.valueContainer,
                    classNames?.valueContainer || css.valueContainer_default
                )}
                ref={valueContainerRef}
                data-select="value-container"
            >
                <input 
                    className={clsx(
                        css.value, 
                        classNames?.value || css.value_default
                    )}
                    value={inputValue !== undefined ? inputValue : state.inputValue}
                    placeholder={placeholder || "Select..."}
                    disabled={disabledInput}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={valueRef}
                    data-select="value"
                />
            </div>

            <div 
                className={clsx(
                    css.arrow,
                    classNames?.arrow || css.arrow_default
                )}
            >
                {render?.arrow 
                    ? render.arrow() 
                    : <img src={arrow_asset.src} alt="" />
                }
            </div>
        </div>
    );
};
