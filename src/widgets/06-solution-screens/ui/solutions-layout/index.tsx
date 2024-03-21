import React from 'react';
import css from './solutions-layout.module.scss';

interface Props {
    children: React.ReactNode;
}

export const SolutionsLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className={css.layout}>
            <div className={css.children}>
                {children}
            </div>
        </div>
    );
}