import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import css from './hero.module.scss';

export const Hero: React.FC = () => {
    const { t } = useTranslation('careers');
    
    return (
        <section className={css.hero}>
            <div className="container">
                <div className={css.wrapper}>
                    <h1 
                        className={css.title} 
                        dangerouslySetInnerHTML={{
                            __html: t('hero.title')
                        }}
                    />     

                    <Button 
                        text={t('hero.aboutBtn')}
                        variant="pink-outlined"
                        component="a"
                        href="/about"
                    />
                </div>
            </div>
        </section>
    );
}