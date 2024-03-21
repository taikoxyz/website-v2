import React, { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import Sprite from 'shared/ui/sprite';
import css from './button.module.scss';
import { useAos } from 'shared/lib/hooks/use-aos';

type BaseProps = {
    text: string;
    className?: string;
    disabled?: boolean;
    variant?: "pink" | "pink-outlined";
    animated?: boolean | {
        enabled?: boolean;
        delay?: number;
        offset?: number | string;
    };
    noArrow?: boolean;
    type?: "button" | "submit";
    onClick?: () => void;
}

type LinkProps = {
    component?: "a";
    href: string;
    download?: boolean;
    target?: HTMLAnchorElement['target'];
}

type ButtonProps = {
    component?: "button";
}

type Props = BaseProps & (LinkProps | ButtonProps);

export const Button: React.FC<Props> = ({
    text,
    className,
    disabled,
    onClick,
    noArrow,
    animated = false,
    component: Tag = 'button',
    variant = "pink",
    type = "button",
    ...props
}) => {
    const { ref, inView } = useAos();
    const wrapperRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if(animated && wrapperRef.current) {
            const wrapper = wrapperRef.current;
            wrapper.style.width = `${inView ? wrapper.scrollWidth : 0}px`;
        }
    }, [inView, animated])

    const animatedOptions = useMemo(() => {
        const options = {
            enabled: false,
            delay: 0,
            offset: '30%'
        } as { 
            enabled: boolean;
            delay: number;
            offset: string | number; 
        };

        if(typeof animated === 'boolean' || typeof animated === 'undefined') {
            options.enabled = animated || false;
        } else {
            Object.assign(options, animated);
            options.enabled = true;
        }

        return options;
    }, [animated]);

    return (
        <Tag
            {...props}
            className={clsx(
                css.button,
                css['button_' + variant],
                noArrow && css.button_clear,
                animatedOptions.enabled && css.animated,
                inView && css.animatedInView,
                className,
            )}
            disabled={disabled}
            onClick={onClick}
            type={type}
            ref={ref}
            data-aos-offset={animatedOptions.offset}
        >
            {text}
            <span 
                className={css.button_wrapper} 
                ref={wrapperRef}
                data-text-wrapper
            >
                <span 
                    className={css.button_text} 
                    data-text
                >
                    {text}
                </span>
            </span>
            {!noArrow && (
                <span className={css.button_icon} data-icon>
                    <span><Sprite.Default icon="arrow-right" /></span>
                    <span><Sprite.Default icon="arrow-right" /></span>
                </span>
            )}
        </Tag>
    );
}