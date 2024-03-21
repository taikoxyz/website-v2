import { useEffect, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import { withApp } from 'app/providers/withApp';
import type { AppProps } from 'next/app';
import { withModal } from 'shared/ui/modal2';
import { animateOnScroll } from 'shared/lib/utils/aos';
import 'swiper/css';
import 'app/scss/index.scss';

const App = ({ Component, pageProps }: AppProps) => {
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    placeholderData: (previousData: unknown) => previousData,
                },
            },
        })
    );

    useEffect(() => {
        const animate = animateOnScroll({
            activeClass: "--animate",
            triggerClass: 'aos',
            triggerOnce: true
        });

        return () => animate.destroy();
    });

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </HydrationBoundary>
        </QueryClientProvider>
    );
};

export default withApp(withModal(appWithTranslation(App)));
