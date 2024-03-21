import React from 'react';
import { useTranslation } from 'next-i18next';
import { Banner } from 'shared/components/banner';
import { Button } from 'shared/components/@buttons/button';
import css from './process.module.scss';

export const Process: React.FC = () => {
    const { t } = useTranslation('grant-program');
    
    return (
        <section className={css.process}>
            <Banner 
                text={t('banner.title')}
                button={
                    <Button text={t('banner.learnMore')} />
                }
                icon="star"
            />
        </section>
    );
}