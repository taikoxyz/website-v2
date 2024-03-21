import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { Banner } from 'shared/components/banner';
import { AboutScreensEnum } from 'widgets/02-about-screens/lib/types';
import css from './brand.module.scss';

export const Brand: React.FC = () => {
    const { t } = useTranslation('about');
    
    return (
        <section 
            className={css.brand}
            id={AboutScreensEnum.BRAND}
        >
            <div className="container">
                <Banner 
                    text={t('ourBrand')}
                    icon="book"
                    button={
                        <Button 
                            text={t('viewBrand')}
                            href="/brand-assets"
                            component='a'
                        />
                    }
                    fullwidth
                />
            </div>
        </section>
    );
}