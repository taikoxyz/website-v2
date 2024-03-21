import React from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import queryString from 'qs';
import { withTranslation } from 'app/providers/withTranslation';
import { blogApi } from 'shared/lib/api';
import { useArticle } from 'widgets/09-article-screens';
import { ArticleApiEnum } from 'widgets/09-article-screens/lib/types';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import MainLayout from 'widgets/layouts/main-layout';
import * as ArticleScreens from 'widgets/09-article-screens';
import { SideLayout } from 'widgets/layouts/side-layout';
import { Menu } from 'widgets/menu';
import { LatestArticles } from 'widgets/09-article-screens';
import { IBlog } from 'shared/lib/types';
import css from './article.module.scss';
import Head from 'next/head';
import { fileServerPath } from 'shared/lib/utils/file-server-path';
import { getArticleText } from 'entities/article/lib/getArticleText';

const Article: NextPage = () => {
    const article = useArticle();

    return (
        <MainLayout 
            title={`${article.title} – Taiko`}
            meta={{
                description: getArticleText(article.content).join('\n'),
                image: fileServerPath(article.image.url)
            }}
        >
            <Head>
                <style dangerouslySetInnerHTML={{
                    __html: ` html { scroll-behavior: smooth; } `
                }} />
            </Head>
            <Menu />
            <Header />
            <div className={css.gap}>
                <SideLayout
                    classNames={{
                        main: css.children
                    }}
                    sideElement={<ArticleScreens.Side />}
                    children={
                        <>
                            <ArticleScreens.Hero />
                            <ArticleScreens.Preview />
                            <ArticleScreens.Content />
                            <ArticleScreens.Apply />
                            <ArticleScreens.Links />
                        </>
                    }
                />
                <LatestArticles />
            </div>
            <Footer />
        </MainLayout>
    );
}

export default Article;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async (ctx) => {
        const queryClient = new QueryClient();
        const slug = ctx.query.slug?.toString() || '';

        await queryClient.prefetchQuery({
            queryKey: [ArticleApiEnum.ARTICLE],
            queryFn: () => blogApi.getOne(slug)
        });

        const article = queryClient.getQueryData<IBlog>([ArticleApiEnum.ARTICLE]);

        if(!article) {
            return {
                props: {},
                redirect: {
                    permanent: false,
                    destination: '/blog'
                }
            };
        }

        const query = queryString.stringify({
            skipIds: article?.id,
            _limit: 8
        });

        await queryClient.prefetchQuery({
            queryKey: [ArticleApiEnum.LATEST_ARTICLES],
            queryFn: () => blogApi.getAll(query)
        })


        return {
            props: {
                dehydratedState: dehydrate(queryClient)
            }
        }
    },
    ['article']
)