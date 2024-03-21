import { useTranslation } from 'next-i18next';
import React from 'react';
import css from './about.module.scss';

export const About: React.FC = () => {
    const { t } = useTranslation('careers');
    
    return (
        <section className={css.about}>
            <div className="container">
                <div className={css.wrapper}>
                    <div className={css.left}>
                        <p className={css.suptitle}>
                            {t('about.suptitle')}
                        </p>
                    </div>

                    <div className={css.right}>
                        <h2 
                            className={css.title} 
                            dangerouslySetInnerHTML={{
                                __html: t('about.title')
                            }}
                        />

                        <div className={css.text}>
                            {t('about.text').split('\n').map((item) => (
                                <p key={item}>{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}