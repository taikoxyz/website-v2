import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { withTranslation } from 'app/providers/withTranslation';
import { Menu } from 'widgets/menu';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import MainLayout from 'widgets/layouts/main-layout';
import * as GrantScreens from 'widgets/11-grant-screens';
import css from './grant-program.module.scss';
import { useTranslation } from 'next-i18next';

const GrantProgram: NextPage = () => {
    const { t } = useTranslation('grant-program');
    
    return (
        <MainLayout
            title="Grant Program – Taiko"
            description={t('hero.title')}
            className={css.root}
        >
            <Menu />
            <Header />
            <div className={css.gap}>
                <GrantScreens.Hero />
                <GrantScreens.KeyDates />
                <GrantScreens.Mission />
                {/* <GrantScreens.Community /> */}
                <GrantScreens.Tracks />
                <GrantScreens.Support />
            </div>
            <Footer />
        </MainLayout>
    );
}

export default GrantProgram;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async () => ({ props: {} }),
    ['grant-program']
);