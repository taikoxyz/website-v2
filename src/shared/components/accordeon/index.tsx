import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from 'shared/lib/hooks/use-click-outside';
import Sprite from 'shared/ui/sprite';
import css from './accordeon.module.scss';

interface Props {
    question: string;
    answer: string;
}

export const Accordeon: React.FC<Props> = ({
    question,
    answer
}) => {
    const [active, setActive] = useState(false);
    const ref = useClickOutside(() => setActive(false));
    const contentRef = useRef<HTMLDivElement>(null);

    const toggle = () => setActive(active => !active);

    useEffect(() => {
        const contentEl = contentRef.current;
        if(!contentEl) return;

        contentEl.style.height = `${active ? contentEl.scrollHeight : 0}px`;
    });

    return (
        <div 
            ref={ref}
            className={clsx(
                css.accordeon, 
                active && css.accordeonActive
            )}
        >
            <button 
                className={css.button}
                onClick={toggle}
                data-class="button"
            >
                <span>{question}</span>
                <Sprite.Default icon="plus" />
            </button>

            <div 
                ref={contentRef}
                className={css.content}
                data-class="content"
            >
                <div 
                    className={css.content_inner} 
                    dangerouslySetInnerHTML={{
                        __html: answer
                    }}
                    data-class="content-text"
                />
            </div>
        </div>
    );
}