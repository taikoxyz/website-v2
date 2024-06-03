import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { useAos } from 'shared/lib/hooks/use-aos';
import { MediaQuery } from 'shared/ui/media-query';
import { AboutScreensEnum } from 'widgets/02-about-screens/lib/types';
import css from './community.module.scss';
import clsx from 'clsx';

export const Community: React.FC = () => {
    const { ref, inView } = useAos();
    const spanRef = useRef<HTMLSpanElement>(null);
    const { t } = useTranslation('about');

    useEffect(() => {
        if(spanRef.current && inView) {
            let current = { var: +(spanRef.current.textContent || 0) };

            gsap.to(current, 2, {
                var: 90,
                onUpdate: function() {
                    console.log('upd')
                    spanRef.current!.innerHTML = `${Math.ceil(current.var)}`;
                }
            });
        }
    }, [inView]);
    
    return (
        <section 
            className={clsx(css.community, inView && css.communityInView)}
            id={AboutScreensEnum.COMMUNITY}
        >
            <div className="container">
                <div className={css.wrapper}>
                    <div className={css.content}>
                        <div className={css.content_inner}>
                            <p className={css.suptitle}>
                                {t('community.suptitle')}
                            </p>

                            <h2 className={css.title}>
                                {t('community.title')}
                            </h2>

                            <p className={css.text}>
                                {t('community.text')}
                            </p>
                        </div>
                    </div>

                    <div className={css.image}>
                        <MediaQuery 
                            query="(max-width: 656px)"
                            children={
                                <img src="/img/about/community-circle-mobile.svg" alt="" />
                            }
                        />
                        <MediaQuery 
                            query="(min-width: 657px)"
                            children={
                                <img src="/img/about/community-circle.svg" alt="" />
                            }
                        />
                        <div className={css.image_content} ref={ref}>
                            <p className={css.image_counter}>
                                <span ref={spanRef}>35</span>+
                            </p>
                            <p className={css.image_dapps}>
                                Dapps
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}