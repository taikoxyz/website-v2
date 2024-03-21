import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import MainLayout from 'widgets/layouts/main-layout';
import { Menu } from 'widgets/menu';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { withTranslation } from 'app/providers/withTranslation';
import * as SolutionScreens from 'widgets/06-solution-screens';
import css from './solutions.module.scss';
import { useTranslation } from 'next-i18next';

const Solutions: NextPage = () => {
    const { t } = useTranslation('solutions');
    
    return (
        <MainLayout
            className={css.solutions}
            description={t('hero.title')}
            title="Solutions – Taiko"
        >
            <Menu />
            <Header theme="dark" fixed />
            <SolutionScreens.SolutionsLayout>
                <SolutionScreens.Hero />
                <SolutionScreens.Platform />
                <SolutionScreens.Infrastructure />
            </SolutionScreens.SolutionsLayout>
            <Footer />
        </MainLayout>
    );
}

export default Solutions;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async () => ({ props: {} }),
    ['solutions']
);