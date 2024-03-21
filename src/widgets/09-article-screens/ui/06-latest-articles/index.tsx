import { useQuery } from '@tanstack/react-query';
import { BlogSliderLayout } from 'entities/article';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { IBlogsResponse } from 'shared/lib/types';
import { ArticleApiEnum } from 'widgets/09-article-screens/lib/types';
import css from './latest-articles.module.scss';

export const LatestArticles: React.FC = () => {
    const { data } = useQuery<IBlogsResponse>({ queryKey: [ArticleApiEnum.LATEST_ARTICLES] });
    const { t } = useTranslation('article');

    return (
        <section className={css.articles}>
            <BlogSliderLayout 
                title={t('latestArticles')}
                data={data?.results || []}
            />
        </section>
    );
}