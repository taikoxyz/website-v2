import { useTranslation } from 'next-i18next';
import React from 'react';
import css from './hero.module.scss';

export const Hero: React.FC = () => {
    const { t } = useTranslation('brand-assets');
    
    return (
        <section className={css.hero}>
            <div className="container">
                <div className={css.content}>
                    <h1 
                        className={css.title} 
                        dangerouslySetInnerHTML={{
                            __html: t('hero.title')
                        }}
                    />

                    <p className={css.text}>
                        {t('hero.text')}
                    </p>
                </div>
            </div>
        </section>
    );
}