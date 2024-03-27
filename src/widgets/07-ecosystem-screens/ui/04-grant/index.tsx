import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { Banner } from 'shared/components/banner';
import css from './grant.module.scss';

export const Grant: React.FC = () => {
    const { t } = useTranslation('ecosystem');

    return (
        <section className={css.grant}>
            <div className="container">
                <div className={css.wrapper}>
                    <div className={css.content}>
                        <div className={css.content_left}>
                            <p className={css.suptitle}>
                                {t('grant.suptitle')}
                            </p>
                        </div>

                        <div className={css.content_right}>
                            <p 
                                className={css.text} 
                                dangerouslySetInnerHTML={{
                                    __html: t('grant.text')
                                }}
                            />
                        </div>
                    </div>

                   <div className={css.banner}>
                    <Banner 
                            icon="star"
                            text={t('grant.applyText')}
                            button={
                                <Button
                                    text={t("grant.contactUs")}
                                    component="a"
                                    href="/grant-program"
                                /> 
                            }
                            fullwidth
                        />
                   </div>
                </div>
            </div>
        </section>
    );
}