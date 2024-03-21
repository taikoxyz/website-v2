import React from 'react';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Menu } from 'widgets/menu';
import MainLayout from 'widgets/layouts/main-layout';
import * as BlogScreens from 'widgets/08-blog-screens';
import { GetServerSideProps, NextPage } from 'next';
import { withTranslation } from 'app/providers/withTranslation';
import { SideLayout } from 'widgets/layouts/side-layout';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { BlogApiKeys } from 'widgets/08-blog-screens/lib/types';
import { blogApi } from 'shared/lib/api';
import { getBlogQuery } from 'widgets/08-blog-screens';
import { WithBlogFilter } from 'widgets/08-blog-screens/provider';
import css from './blog.module.scss';

const Blog: NextPage = () => {
    return (
        <MainLayout 
            description="Our blog"
            title="Blog — Taiko"
        >
            <Menu />
            <Header />
            <WithBlogFilter>
                <div className={css.gap}>
                    <SideLayout 
                        sideElement={<BlogScreens.SideFilters />}
                        classNames={{ main: css.sideLayout }}
                    >
                        <BlogScreens.Head />
                        <BlogScreens.Blogs />
                    </SideLayout>
                </div>
            </WithBlogFilter>
            <Footer />
        </MainLayout>
    );
}

export default Blog;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async (ctx) => {
        const queryClient = new QueryClient();

        const query = getBlogQuery(ctx.query);

        await queryClient.prefetchInfiniteQuery({
            queryKey: [BlogApiKeys.ALL_BLOGS, query],
            queryFn: () => blogApi.getAll(query),
            initialPageParam: 0
        });

        return {
            props: {
                dehydratedState: dehydrate(queryClient)
            }
        }
    },
    ['blog']
);