import clsx from 'clsx';
import React from 'react';
import Sprite from 'shared/ui/sprite';
import css from './back-link.module.scss';

interface Props {
    text: string
    href: string;
    className?: string
}

export const BackLink: React.FC<Props> = ({
    href,
    text,
    className
}) => {
    return (
        <a 
            className={clsx(css.link, className)}
            href={href}
        >
            <Sprite.Default icon="arrow-right" />
            <span>{text}</span>
        </a>
    );
}