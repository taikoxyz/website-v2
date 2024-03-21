import { useTranslation } from 'next-i18next';
import React from 'react';
import css from './hero.module.scss';

export const Hero: React.FC = () => {
    const { t } = useTranslation('grant-program');
    
    return (
        <section className={css.hero}>
            <div className="container">
                <img 
                    src="/img/grant/hero-banner.jpg"
                    className={css.banner} 
                    alt=""
                />

                <div className={css.content}>
                    <h1 
                        className={css.title} 
                        dangerouslySetInnerHTML={{
                            __html: t('hero.title')
                        }}
                    />

                    <p className={css.text}>
                        {t('hero.text').split('\n').map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
}