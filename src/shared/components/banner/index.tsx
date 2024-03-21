import React from 'react';
import { Icon } from '../icon';
import css from './banner.module.scss';

interface Props {
    text: string;
    icon: string;
    button: React.ReactNode
    fullwidth?: boolean;
}

export const Banner: React.FC<Props> = ({
    button,
    icon,
    text,
    fullwidth,
}) => {
    return (
        <div className={css.banner}>
            <div className={fullwidth ? "" : "container"}>
                <div className={css.wrapper} data-class="banner">
                    <Icon 
                        className={css.icon}
                        icon={icon}
                        variant="pink"
                    />

                    <p className={css.text}>
                        {text}
                    </p>

                    <div className={css.button}>
                        {button}
                    </div>
                </div>
            </div>
        </div>
    );
}