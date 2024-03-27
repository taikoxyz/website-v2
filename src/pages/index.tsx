import { GetServerSideProps } from "next";
import { withTranslation } from "app/providers/withTranslation";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Footer } from "widgets/footer";
import { Header } from "widgets/header";
import * as HomeScreens from 'widgets/01-home-screens';
import MainLayout from "widgets/layouts/main-layout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HomeApiKeys } from "widgets/01-home-screens/lib/types";
import { blogApi } from "shared/lib/api";
import { Menu } from "widgets/menu";
import css from './home.module.scss';
import { useEffect, useState } from "react";
import { exucuteOnReadyPage } from "shared/lib/utils/browser";

function Home() {
    const [complete, setComplete] = useState(false);
    const { t } = useTranslation('home');

    useEffect(() => exucuteOnReadyPage(() => setComplete(true)), []);
    
    return (    
        <MainLayout 
            className={clsx(
                css.root,
                complete && css.rootAnimated
            )}
            meta={{
                title: t('Home - Taiko'),   
                description: t('Taiko is a fully permissionless, Ethereum-equivalent based rollup. Inspired, secured, and sequenced by Ethereum.'),
                image: "/img/og-image.png",
                url: "https://taiko.xyz/"
            }}
            title="Home – Taiko"
        >
            <Menu />
            <Header fixed />
            <div className={css.gap}>
                <HomeScreens.GradientFill>
                    <HomeScreens.Hero />
                    <HomeScreens.StickyContent
                        stickyEl={<HomeScreens.Advantages />}
                        children={<HomeScreens.About />}
                    />
                </HomeScreens.GradientFill>
                <HomeScreens.Solutions />
                <HomeScreens.Ecosystem />
                <HomeScreens.Community />
                <HomeScreens.Blog />
                <Footer subscribeBar />
            </div>
        </MainLayout>
    );
} 

export default Home;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async (context) => {
        const queryClient = new QueryClient();

        await queryClient.prefetchQuery({
            queryKey: [HomeApiKeys.BLOG],
            queryFn: () => blogApi.getAll()
        });

        return {
            props: {
                dehydratedState: dehydrate(queryClient)
            },
        }
    },
    ["home"] 
)