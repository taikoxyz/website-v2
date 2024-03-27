import { useInfiniteQuery } from '@tanstack/react-query';
import { BlogItem } from 'entities/article';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Button } from 'shared/components/@buttons/button';
import { blogApi } from 'shared/lib/api';
import { IBlogsResponse } from 'shared/lib/types';
import { fileServerPath } from 'shared/lib/utils/file-server-path';
import { getBlogQuery, flatBlogs } from 'widgets/08-blog-screens/lib';
import { BlogApiKeys } from 'widgets/08-blog-screens/lib/types';
import { useBlogFilter } from 'widgets/08-blog-screens/provider';
import css from './blogs.module.scss';

export const Blogs: React.FC = () => {
    const { t } = useTranslation();
    const { state } = useBlogFilter();
    const router = useRouter();
    const query = getBlogQuery(router.query, undefined, state);

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetching
    } = useInfiniteQuery<IBlogsResponse>({
        queryKey: [BlogApiKeys.ALL_BLOGS, query],
        queryFn: ({ pageParam }) => blogApi.getAll(
            getBlogQuery(router.query, pageParam as number, state)
        ),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if(lastPage.meta.page < lastPage.meta.pageCount) {
                return lastPage.meta.page + 1;
            }
        }
    });

    const blogs = useMemo(
        () => flatBlogs(data?.pages || []),
        [data]
    );

    const countBlogs = useMemo(
        () => {
            if(!data?.pages) return 0;
            return data.pages[data.pages.length - 1].meta.total;
        },
        [data]
    );

    return (
        <div className={css.blogs}>
            <ul className={css.list}>
                {blogs.map((item) => (
                    <li
                        className={css.list_item} 
                        key={item.id}
                    >
                        <BlogItem 
                            className={css.blog}
                            url={item.link}
                            title={item.title}
                            timeToRead={item.timeToRead}
                            categoryName={item.category.name}
                            imageSrc={item.image.url}
                            createdAt={item.date}
                        />
                    </li>
                ))}
            </ul>

            <p className={css.countShow}>
                Show {blogs.length} of {countBlogs} articles
            </p>

            {hasNextPage && (
                <Button 
                    onClick={() => fetchNextPage()}
                    disabled={isFetching}
                    className={css.viewMore}
                    text={t('viewMore')}
                    variant="pink-outlined"
                />
            )}
        </div>
    );
}