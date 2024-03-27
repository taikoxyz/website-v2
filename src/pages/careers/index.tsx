import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import MainLayout from 'widgets/layouts/main-layout';
import { Menu } from 'widgets/menu';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import * as CareersScreens from 'widgets/04-career-screens';
import { withTranslation } from 'app/providers/withTranslation';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { careerApi } from 'shared/lib/api';
import { CareerApiEnum } from 'widgets/04-career-screens/lib/types';
import { useTranslation } from 'next-i18next';
import css from './careers.module.scss';

const Careers: NextPage = () => {
    const { t } = useTranslation('careers');
    
    return (
        <MainLayout 
            className={css.careers}
            description={t('about.text')}
            title="Careers – Taiko"
        >
            <Menu />
            <div className={css.header}>
                <Header theme="dark" />
            </div>
            <div className={css.gap}>
                <CareersScreens.Hero />
                {/* <CareersScreens.About /> */}
                <CareersScreens.Positions />
                <CareersScreens.Contact />
            </div>
            <Footer />
        </MainLayout>
    );
}

export default Careers;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async () => {
        const queryClient = new QueryClient();

        await queryClient.prefetchQuery({
            queryKey: [CareerApiEnum.ALL_POSITIONS],
            queryFn: () => careerApi.getAll()
        });

        return {
            props: {
                dehydratedState: dehydrate(queryClient)
            }
        };
    },
    ['careers']
);