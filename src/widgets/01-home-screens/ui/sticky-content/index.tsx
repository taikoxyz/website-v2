import React, { useEffect, useRef } from 'react';
import css from './sticky-content.module.scss';

interface Props {
    stickyEl: React.ReactNode;
    children: React.ReactNode;
}

const StickyContent: React.FC<Props> = ({ children, stickyEl }) => {
    const stickyRef = useRef<HTMLDivElement>(null);

    const calcTop = () => {
        if (stickyRef.current) {
            stickyRef.current.style.top = Math.min(
                window.innerHeight - stickyRef.current.scrollHeight,
                0
            ) + 'px';
        }
    };

    useEffect(() => {
        window.addEventListener('resize', calcTop);
        window.addEventListener('scroll', calcTop);

        return () => {
            window.removeEventListener('resize', calcTop);
            window.removeEventListener('scroll', calcTop);
        };
    });

    useEffect(() => calcTop(), []);

    return (
        <div className={css.root}>
            <div className={css.pad} ref={stickyRef}>
                {stickyEl}
            </div>
            <div className={css.children}>
                {children}
            </div>
        </div>
    );
};

export default StickyContent;