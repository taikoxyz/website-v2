import { useTranslation } from 'next-i18next';
import React from 'react';
import { AboutScreensEnum } from 'widgets/02-about-screens/lib/types';
import css from './hero.module.scss';

export const Hero: React.FC = () => {
    const { t } = useTranslation('about');
    
    return (
        <section 
            className={css.hero}
            id={AboutScreensEnum.HERO}
        >
            <div className="container">
                <h1 
                    className={css.title} 
                    dangerouslySetInnerHTML={{
                        __html: t('hero.title') 
                    }}
                />
            </div>
        </section>
    );
}