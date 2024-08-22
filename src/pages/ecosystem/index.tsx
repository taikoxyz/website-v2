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
                    <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f9f9f9', borderLeft: '5px solid #f44336' }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                            The following applications all allege they are building atop the Taiko ecosystem. 
                            Please note that no guarantee is made as to the authenticity, veracity, or safety of 
                            any of these protocols. You assume all risks for using any links, so please conduct your 
                            own research and exercise caution. If you observe any issues with any link or would like 
                            to add to this list, please create a PR in the following Github repository: 
                            <a href="https://github.com/taikoxyz/website-v2" target="_blank" rel="noopener noreferrer" 
                               style={{ color: '#0073e6', textDecoration: 'underline' }}>
                                https://github.com/taikoxyz/website-v2
                            </a>.
                        </p>
                    </div>
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