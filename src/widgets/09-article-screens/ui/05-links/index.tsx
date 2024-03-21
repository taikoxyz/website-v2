import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MediaQuery } from 'shared/ui/media-query';
import Sprite from 'shared/ui/sprite';
import { Share } from '../07.02-share';
import css from './links.module.scss';
import { IBlogShort, IBlogsNear } from 'shared/lib/types';
import { useArticle } from 'widgets/09-article-screens';
import { blogApi } from 'shared/lib/api';

export const Links: React.FC = () => {
    const [blogs, setBlogs] = useState<IBlogsNear>({ 
        prev: null, 
        next: null 
    })
    const article = useArticle();
    const { t } = useTranslation('article');

    useEffect(() => {
        blogApi.near(article.id)
            .then((blog) => setBlogs(blog))
    }, [article]);

    return (
        <section className={css.links}>
            <MediaQuery 
                query="(max-width: 768px)"
                children={
                    <Share />
                }
            />

            {(blogs.prev || blogs.next) && (
                <ul className={css.links_list}>
                    {blogs.prev && (
                        <li className={css.links_item}>
                            <h4 className={css.links_title}>
                                <Sprite.Default 
                                    style={{ transform: `scaleX(-1)` }} 
                                    icon="arrow-right-small" 
                                />
                                <span>{t('previous')}</span>
                            </h4>
                            <Link className={css.links_name} href={`/blog/${blogs.prev.slug}`}>
                                {blogs.prev.title}
                            </Link>
                        </li>
                    )}
                    {blogs.next && (
                        <li className={`${css.links_item} ${css.links_itemNext}`}>
                            <h4 className={css.links_title}>
                                <span>{t('next')}</span>
                                <Sprite.Default 
                                    icon="arrow-right-small" 
                                />
                            </h4>
                            <Link className={css.links_name} href={`/blog/${blogs.next.slug}`}>
                                {blogs.next.title}
                            </Link>
                        </li>
                    )}
                </ul>
            )}
        </section>
    );
}