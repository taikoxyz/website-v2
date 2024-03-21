import React from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from 'shared/components/@buttons/button';
import { MediaQuery } from 'shared/ui/media-query';
import css from './hero.module.scss';

export const Hero: React.FC = () => {
    const { t } = useTranslation('events');
    
    const Card = () => (
        <div className={css.card}>
            <h3 className={css.suptitle}>
                {t('suptitle')}
            </h3>

            <p className={css.card_text}>
                {t('text')}
            </p>

            <Button 
                className={css.card_button}
                text={t('learnMore')}
                component="a"
                href="/about"
                variant="pink-outlined"
            />
        </div>
    );

    return (
        <section className={css.hero}>
            <div className="container">
                <div className={css.wrapper}>
                    <img 
                        className={css.image} 
                        src="/img/events-hero.jpg" 
                        alt="" 
                    />

                    <div className={css.content}>
                        <div className={css.content_left}>
                            <h3 className={css.suptitle}>
                                {t('suptitle')}
                            </h3>

                            <h1 className={css.title}>
                                {t('title')}
                            </h1>
                        </div>

                        <div className={css.content_right}>
                            {/* <MediaQuery 
                                query="(min-width: 769px)"
                                children={<Card />}
                            /> */}
                        </div>
                    </div>
                </div>
                
                {/* <MediaQuery 
                    query="(max-width: 768px)"
                    children={<Card />}
                /> */}
            </div>
        </section>
    );
}