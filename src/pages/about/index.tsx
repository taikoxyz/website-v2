import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { withTranslation } from 'app/providers/withTranslation';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import MainLayout from 'widgets/layouts/main-layout';
import * as AboutScreens from 'widgets/02-about-screens';
import css from './about.module.scss';
import { Menu } from 'widgets/menu';
import { useTranslation } from 'next-i18next';

const About: NextPage = () => {
    const { t } = useTranslation('about');
    
    return (
        <MainLayout
            description={t('hero.title')}
            title="About – Taiko"
        >
            <Menu />
            <Header />
            <div className={css.gap}>
                <AboutScreens.Hero />
                <AboutScreens.Community />
                <AboutScreens.Mission />
                <AboutScreens.Brand />
                <AboutScreens.Careers />
                <Footer />
            </div>
        </MainLayout>
    );
}

export default About;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async () => {
        return {
            props: {}
        }
    },
    ['about']
)