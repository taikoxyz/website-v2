import React from 'react';
import { useTranslation } from 'next-i18next';
import { useArticle } from 'widgets/09-article-screens/lib';
import { ArticleScreensEnum } from 'widgets/09-article-screens/lib/types';
import { RichText } from 'shared/components/rich-text';
import css from './apply.module.scss';

export const Apply: React.FC = () => {
    const { t } = useTranslation('article');
    const { howToApply } = useArticle();

    return (
        <section 
            className={css.apply} 
            id={ArticleScreensEnum.HOW_TO_APPLY}
        >
            <h3 className={css.title}>
                {t('howToApply')}
            </h3>
            <RichText
                className={css.text}
                content={howToApply}
                blocks={{
                    link: ({ children, url }) => (
                        <a href={url} target="_blank">
                            {children}
                        </a>
                    ),
                }}
            />
        </section>
    );
};
