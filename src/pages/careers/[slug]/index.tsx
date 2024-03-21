import React, { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Modal } from 'shared/ui/modal2';
import { withTranslation } from 'app/providers/withTranslation';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { PositionApiEnum, PositionModalEnum } from 'widgets/05-position-screens/lib/types';
import { careerApi } from 'shared/lib/api';
import { ApplyModal, usePosition } from 'widgets/05-position-screens';
import { Menu } from 'widgets/menu';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import MainLayout from 'widgets/layouts/main-layout';
import * as PositionScreens from 'widgets/05-position-screens';
import css from './position.module.scss';

const Position: NextPage = () => {
    const position = usePosition();
    const router = useRouter();

    useEffect(() => {
        (window as any).router = router
    }, []);

    return (
        <MainLayout
            title={`${position.title} – Taiko`}
            className={css.position}
        >
            <Menu />
            <Modal name={PositionModalEnum.APPLY_POS} children={<ApplyModal />} />
            <div className={css.header}>
                <Header theme="dark" />
            </div>
            <div className={css.gap}>
                <PositionScreens.Hero />
                <PositionScreens.Content />
            </div>
            <Footer />
        </MainLayout>
    );
}

export default Position;

export const getServerSideProps: GetServerSideProps = withTranslation(
    async (ctx) => {
        const queryClient = new QueryClient();
        const slug = ctx.query.slug?.toString() || '';

        await queryClient.prefetchQuery({
            queryKey: [PositionApiEnum.POSITION],
            queryFn: () => careerApi.getOne(slug)
        });

        if(!queryClient.getQueryData) {
            return {
                props: {},
                redirect: {
                    permanent: false,
                    destination: '/careers'
                }
            };
        }

        return {
            props: {
                dehydratedState: dehydrate(queryClient)
            }
        }
    },
    ['position']
)