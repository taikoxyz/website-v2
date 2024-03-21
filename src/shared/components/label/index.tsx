import clsx from 'clsx';
import React from 'react';
import css from './label.module.scss';

interface Props {
    text: string;
    className?: string;
}

export const Label: React.FC<Props> = ({ 
    text, 
    className 
}) => {
    return (
        <p className={clsx(css.label, className)} data-label>
            <span>{text}</span>
        </p>
    );
};
