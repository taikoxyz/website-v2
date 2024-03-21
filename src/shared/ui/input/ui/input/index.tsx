import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { createClassNames, normalizeProps } from '../../lib';
import { InputProps } from '../../types';
import css from './input.module.scss';

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    (props, ref) => {
        const { 
            component = 'input', 
            className, 
            icon, 
            controls, 
            title,
            error,
            placeholder,
            variant,
        } = props;

        const inputRef = useRef<HTMLElement>();
        const inputProps = normalizeProps(props);
        const classNames = useMemo(() => createClassNames(className), [className]);

        const Component: any = component;

        const onClickFieldFocus = () => {
            if(inputRef.current) inputRef.current.focus();
        }

        useEffect(() => {
            if(props.component === 'textarea' && props.autoHeight) {
                const input = inputRef.current;
                if(input) {
                    input.style.height = '';
                    input.style.height = input.scrollHeight + 'px';
                }
            }
        }, [props])

        return (
            <div 
                className={clsx(classNames.root, error && css.rootError)}
                data-input-error={!!error}
            >
                {title && (
                    <h3
                        className={clsx(classNames.title)}
                        data-class="title"
                    >
                        {title}
                    </h3>
                )}
                
                <div 
                    className={clsx(classNames.field)} 
                    onClick={onClickFieldFocus}
                    data-class="field"
                    data-not-empty={props.value !== ''}
                >
                    {icon}

                    <Component
                        {...inputProps}
                        data-class="input"
                        className={clsx(classNames.input)}
                        placeholder={variant !== 'float' && placeholder}
                        ref={(el: HTMLInputElement | HTMLTextAreaElement) => {
                            typeof ref === 'function' && ref(el);
                            typeof ref === 'object' && ref && (ref.current = el);
                            inputRef.current = el;
                        }}
                    />

                    {variant === 'float' && (
                        <span 
                            className={clsx(
                                classNames.placeholder,
                                props.value !== '' && css.placeholderActive 
                            )}
                            onClick={(ev) => ev.preventDefault()}
                        >
                            <span>{placeholder}</span>
                        </span>
                    )}

                    {controls}
                </div>

                {error && (
                    <p 
                        className={clsx(classNames.error)}
                        data-class="error"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

const t = () => <Input component="textarea" />;
