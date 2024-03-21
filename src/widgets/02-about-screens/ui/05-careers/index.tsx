import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { MediaQuery } from 'shared/ui/media-query';
import { AboutScreensEnum } from 'widgets/02-about-screens/lib/types';
import css from './careers.module.scss';

export const Careers: React.FC = () => {
    const { t } = useTranslation('about');
    
    return (
        <section 
            className={css.careers}
            id={AboutScreensEnum.CAREERS}
        >
            <div className="container">
                <div className={css.wrapper}>
                    <MediaQuery 
                        query="(min-width: 769px)"
                        children={
                            <img 
                                className={css.image}
                                src="/img/about/careers-background.jpg" 
                                alt="" 
                            />
                        }
                    />
                    <MediaQuery 
                        query="(max-width: 768px)"
                        children={
                            <img 
                                className={css.image}
                                src="/img/about/careers-background-mobile.jpg" 
                                alt="" 
                            />
                        }
                    />
                    <div className={css.box}>
                        <h3 className={css.content_suptitle}>
                            {t('careers.suptitle')}
                        </h3>

                        <div className={css.content}>
                            <div className={css.content_left}>
                                <h2 
                                    className={css.content_title} 
                                    dangerouslySetInnerHTML={{
                                        __html: t('careers.title')
                                    }}
                                />
                            </div>

                            <div className={css.content_right}>
                                <div className={css.content_text}>
                                    {t('careers.text').split('\n').map((text) => (
                                        <p key={text}>
                                            {text}
                                        </p>
                                    ))}
                                </div>

                                <Button 
                                    className={css.content_button}
                                    text={t('careers.viewBtn')}
                                    component="a"
                                    href="/careers"
                                />
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        </section>
    );
}