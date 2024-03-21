import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Menu } from 'widgets/menu';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { withTranslation } from 'app/providers/withTranslation';
import MainLayout from 'widgets/layouts/main-layout';
import * as BrandScreens from 'widgets/03-brand-screens';
import { useTranslation } from 'next-i18next';
import css from './brand-assets.module.scss';

const BrandAssets: NextPage = () => {
    const { t } = useTranslation('brand-assets');
    
    return (
        <MainLayout
            className={css.root}
            description={t('hero.text')}
            title="Brand Assets – Taiko"
        >
            <Menu />
            <Header />
            <div className={css.gap}>
                <BrandScreens.Hero />
                <BrandScreens.Logo />
                <BrandScreens.ColorPalette />
                <BrandScreens.Topography />
                <BrandScreens.BrandBook />
            </div>
            <Footer />
        </MainLayout>
    );
}

export default BrandAssets;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async () => ({ props: {} }),
    ['brand-assets']
);