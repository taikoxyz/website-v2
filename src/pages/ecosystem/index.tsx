import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { withTranslation } from 'app/providers/withTranslation';
import MainLayout from 'widgets/layouts/main-layout';
import { Menu } from 'widgets/menu';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { EcosystemApiEnum } from 'widgets/07-ecosystem-screens/lib/types';
import { EcosystemFilters, getProjectsQuery } from 'widgets/07-ecosystem-screens';
import { projectApi } from 'shared/lib/api';
import * as EcosystemScreens from 'widgets/07-ecosystem-screens';
import css from './ecosystem.module.scss';
import { useTranslation } from 'next-i18next';

const Ecosystem: NextPage = () => {
    const { t } = useTranslation('ecosystem');
    
    return (
        <MainLayout
            title="Ecosystem – Taiko"
            description={t('title')}
            className={css.root}
        >
            <Menu />
            <Header fixed />
            <div className={css.gap}>
                <EcosystemFilters>
                    <EcosystemScreens.Hero />
                    <EcosystemScreens.Controls />
                    <EcosystemScreens.Disclaimer />
                    <EcosystemScreens.Projects />
                    <EcosystemScreens.Grant />
                </EcosystemFilters>
            </div>
            <Footer />
        </MainLayout>
    );
}

export default Ecosystem;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async (ctx) => {
        const queryClient = new QueryClient();

        const query = getProjectsQuery({
            ...ctx.query,
            search: ''
        });

        await queryClient.prefetchInfiniteQuery({
            queryKey: [EcosystemApiEnum.ALL_PROJECTS, query],
            queryFn: () => projectApi.getAll(query),
            initialPageParam: 0,
        });

        await queryClient.prefetchQuery({
            queryKey: [EcosystemApiEnum.LAST_PROJECT],
            queryFn: () => projectApi.getLast()
        });

        return {
            props: {
                dehydratedState: dehydrate(queryClient)
            }
        }
    },
    ['ecosystem']
);