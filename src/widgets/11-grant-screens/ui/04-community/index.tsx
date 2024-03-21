import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import css from './community.module.scss';

export const Community: React.FC = () => {
    const { t } = useTranslation('grant-program');
    
    return (
        <section className={css.community}>
            <div className="container">
                <div className={css.content}>
                    <h3 className={css.suptitle}>
                        {t('community.suptitle')}
                    </h3>

                    <div className={css.content_inner}>
                        <div className={css.content_left}>
                            <h2 
                                className={css.title}
                                dangerouslySetInnerHTML={{
                                    __html: t('community.title')
                                }}
                            />
                        </div>

                        <div className={css.content_right}>
                            <p className={css.text}>
                                {t('community.text').split('\n').map((item) => (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: item
                                        }}
                                        key={item}
                                    />
                                ))}
                            </p>

                            <Button 
                                className={css.button}
                                text={t('community.learnMore')}
                                variant="pink-outlined"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}