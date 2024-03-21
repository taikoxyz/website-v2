import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Sprite from 'shared/ui/sprite';
import { useClickOutside } from 'shared/lib/hooks/use-click-outside';
import css from './blog-filter.module.scss';

interface Props {
    title: string;
    placeholder: string;
    children?: React.ReactNode;
    active: boolean;
    setActive: (bool: boolean) => void;
}

export const BlogFilter: React.FC<Props> = ({
    placeholder,
    title,
    children,
    active,
    setActive
}) => {
    const ref = useClickOutside(() => setActive(false));

    return (
        <div 
            className={clsx(css.root, active && css.rootActive)}
            ref={ref}
        >
            <button 
                className={css.button}
                onClick={() => setActive(!active)}
            >
                <span className={css.button_column}>
                    <span className={css.button_title}>
                        {title}
                    </span>
                    <span className={css.button_placeholder}>
                        {placeholder}
                    </span>
                </span>
                <span className={css.button_icon}>
                    <Sprite.Default
                        style={{ transform: active ? 'scaleX(-1)' : '' }}  
                        icon="arrow-right-small" 
                    />
                </span>
            </button>

            {active && (
                <div className={css.dropdown}>
                    <div className={css.dropdown_inner}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}