import React, { useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition, TransitionGroup,  } from 'react-transition-group';
import { Label } from 'shared/components/label';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import css from './hero-labels.module.scss';

interface Props {
    active: boolean;
}

const HeroLabels: React.FC<Props> = ({ active }) => {
    const labels = useTranslationObject<string[]>('hero.taiko.labels', 'home');
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (active) {
            const timer = setTimeout(
                () => {
                    let nextIndex = activeIndex + 1;
                    if(nextIndex > labels.length - 1) {
                        nextIndex = 0;
                    }
                    setActiveIndex(nextIndex);
                },
                3000
            );
            return () => clearTimeout(timer);
        }
    }, [active, activeIndex]);

    return (
        <div className={css.root}>
            <SwitchTransition >
                <CSSTransition 
                    classNames={css}
                    timeout={650}
                    key={activeIndex}
                    mountOnEnter
                    unmountOnExit
                    in
                >
                    <div className={css.label}>
                        <Label text={labels[activeIndex]} />
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
};

export default HeroLabels;