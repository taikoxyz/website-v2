import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { Banner } from 'shared/components/banner';
import css from './brand-book.module.scss';

export const BrandBook: React.FC = () => {
    const { t } = useTranslation('brand-assets');
    
    return (
        <section className={css.brandBook}>
            <Banner 
                icon="book"
                text={t('brandBook.title')}
                button={
                    <Button 
                        component="a"
                        target="_blank"
                        href='https://www.figma.com/file/qVALIk5srW9nvOJwl6NF6F/Taiko-Brand-Guidelines-(External)'
                        text={t('brandBook.button')} />
                }
            />
        </section>
    );
}