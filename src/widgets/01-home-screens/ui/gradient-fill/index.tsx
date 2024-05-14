import React, { useEffect, useRef, useState } from "react";
import { useTranslationObject } from "shared/lib/hooks/use-translation-object";
import { IHomeAdvantage } from "widgets/01-home-screens/lib/types";
import css from "./gradient-fill.module.scss";
import { scrollGradient } from "./lib/scroll-gradient";

const FillCircle: React.FC<IHomeAdvantage> = ({
    id,
    colors
}) => {
    const [active, setActive] = useState(false);
    const instance = useRef<ReturnType<typeof scrollGradient>>();
    const ref = useRef<HTMLDivElement>(null);

    const scroll = () => {
        if(window.pageYOffset > window.innerHeight * 0.2) {
            setActive(true);
        }
    }

    useEffect(() => {
        const dest = document.getElementById(id);

        if(dest && ref.current) {
            instance.current = scrollGradient(
                ref.current, 
                dest, 
                colors.background
            );

            return () => instance.current?.destroy();
        }
    });

    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => window.removeEventListener("scroll", scroll);
    });

    useEffect(() => {
        if(active) {
            instance.current?.run();
        }
    }, [active]);

    return (
        <div 
            className={css.circle} 
            style={{ background: colors.background }}
            ref={ref}
        />
    )
}

const GradientFill: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const advantages = useTranslationObject<IHomeAdvantage[]>('advantages', 'home');
    
    return (
        <div className={css.root}>
            <ul className={css.circles}>
                {advantages.map((item) => (
                    <li 
                        className={css.circles_item} 
                        key={item.id}
                    >
                        <FillCircle {...item} />
                    </li>
                ))}
            </ul>
            <div className={css.content}>
                {children}
            </div>
        </div>
    );
};

export default GradientFill;