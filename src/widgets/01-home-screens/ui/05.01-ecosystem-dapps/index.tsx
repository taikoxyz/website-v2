import React, { useEffect, useRef } from 'react';
import gsap from "gsap"
import { useTranslation } from 'next-i18next';
import { useAos } from 'shared/lib/hooks/use-aos';
import css from './ecosystem-dapps.module.scss';
import clsx from 'clsx';

const EcosystemDapps: React.FC= () => {
    const { ref, inView } = useAos();
    const spanRef = useRef<HTMLSpanElement>(null);
    const { t } = useTranslation('home');

    useEffect(() => {
        if(spanRef.current && inView) {
            let current = { var: +(spanRef.current.textContent || 0) };

            gsap.to(current, 2, {
                var: 100,
                onUpdate: function() {
                    spanRef.current!.innerHTML = `${Math.ceil(current.var)}`;
                }
            });
        }
    }, [inView]);

    return (
        <div 
            className={clsx(
                css.dapps,
                inView && css.dappsActive
            )} 
            ref={ref}
        >
            <div className={css.logos}>
                {[1,2,3,4].map((id) => (
                    <img 
                        loading="lazy"
                        className={css.logos_item}
                        src={`/img/home/ec-${id}.png`}
                        alt=""
                    />
                ))}
            </div>

            <div className={css.content}>
                <h3 className={css.title}>
                    <span ref={spanRef}>60</span>+
                </h3>
                <p className={css.text}>
                    {t('ecosystem.dapps')}
                </p>
            </div>
        </div>
    );
}

export default EcosystemDapps;