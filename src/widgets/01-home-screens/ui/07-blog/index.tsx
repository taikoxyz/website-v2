import { useQuery } from '@tanstack/react-query';
import { BlogSliderLayout } from 'entities/article';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { IBlogsResponse } from 'shared/lib/types';
import { HomeApiKeys, HomeScreensEnum } from 'widgets/01-home-screens/lib/types';
import css from './blog.module.scss';

const Blog: React.FC = () => {
    const { data } = useQuery<IBlogsResponse>({ queryKey: [HomeApiKeys.BLOG] })
    const { t } = useTranslation('home');

    return (
        <section 
            className={css.blog}
            id={HomeScreensEnum.BLOG}
        >
            <BlogSliderLayout 
                title={t('blog.title')}
                data={data?.results || []}
                animated
            />
        </section>
    );
}

export default Blog;