import React from 'react';
import { useTranslation } from 'next-i18next';
import { useArticle } from 'widgets/09-article-screens/lib';
import { ShareButton } from 'shared/ui/share-button';
import css from './share.module.scss';

export const Share: React.FC = () => {
    const { t } = useTranslation();
    const { title, slug } = useArticle();

    return (
        <div className={css.share}>
            <h3 className={css.share_title}>
                {t('shareTitle')}
            </h3>

            <div className={css.share_list}>
                <ShareButton 
                    type="twitter"
                    href={`/blog/${slug}&text=${title} — Taiko`}
                    origin
                />

                <ShareButton 
                    type="linkedin"
                    href={`/blog/${slug}`}
                    origin
                />
            </div>
        </div>
    );
}