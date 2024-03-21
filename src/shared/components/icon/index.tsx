import clsx from 'clsx';
import React from 'react';
import Sprite from 'shared/ui/sprite';
import css from './icon.module.scss';

interface Props {
    icon: string;
    className?: string;
    variant?: "pink" | "white";
}

export const Icon: React.FC<Props> = ({
    className,
    icon,
    variant = "white"
}) => {
    return (
        <div 
            className={clsx(
                css.icon,
                css['icon_' + variant],
                className
            )}
        >
            <Sprite.Default icon={icon} />
        </div>
    );
}