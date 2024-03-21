import clsx from 'clsx';
import React from 'react';
import { MediaQuery } from 'shared/ui/media-query';
import css from './side-layout.module.scss';

interface Props {
    sideElement: React.ReactNode;
    children: React.ReactNode;
    classNames?: {
        root?: string;
        side?: string;
        main?: string;
    }
}

export const SideLayout: React.FC<Props> = ({
    children,
    sideElement,
    classNames
}) => {
    return (
        <div className={clsx(css.layout, classNames?.root)}>
            <div className="container">
                <div className={css.wrapper}>
                    <MediaQuery 
                        query="(min-width: 1125px)"
                        children={
                            <div className={clsx(css.side, classNames?.side)}>
                                {sideElement}
                            </div>
                        }
                    />
                    <div className={clsx(css.children, classNames?.main)}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}