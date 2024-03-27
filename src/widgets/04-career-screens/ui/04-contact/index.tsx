import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { Banner } from 'shared/components/banner';
import css from './contact.module.scss';

export const Contact: React.FC = () => {
    const { t } = useTranslation('careers');
    
    return (
        <section className={css.contact}>
            <div className="container">
                <Banner
                    text={t('banner.title')}
                    button={
                        <Button 
                            component="a"
                            href='mailto:jobs@taiko.xyz'
                            text={t('banner.contactUs')}
                        />
                    }
                    icon="bag"
                />
            </div>
        </section>
    );
}