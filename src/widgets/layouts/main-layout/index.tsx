import React, { useEffect } from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import css from './main-layout.module.scss';

const metaTitle = '';
const metaDescription = '';

const isDev = process.env.NODE_ENV === 'development';

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    className?: string;
    children: React.ReactNode;
    classNames?: {
        menu?: string;
        intro?: string;
    };
    meta?: {
        title?: string;
        description?: string;
        image?: string;
        url?: string;
    };
}

const MainLayout: React.FC<MainLayoutProps> = ({
    title,
    description,
    keywords,
    className,
    children,
    classNames = {},
    meta = {},
}) => {
    return (
        <div className={css.box}>
            <div className={clsx(css.main, className)}>
                <Head>
                    <title>{title || "Taiko"}</title>
                    <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
                    <meta name="description" content={description || meta.description} />
                    {meta.image && <meta property="og:image" content={meta.image} />}
                    {meta.image && <meta property="twitter:image" content={meta.image} />}
                    <meta property="og:title" content={meta.title || metaTitle} />
                    <meta property="og:description" content={meta.description || metaDescription} />
                    <meta property="twitter:title" content={meta.title || metaTitle} />
                    <meta property="twitter:description" content={meta.description || metaDescription} />
                    
                    <link rel="preload" href="/fonts/ClashDisplay-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/ClashDisplay-Semibold.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/ClashGrotesk-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/ClashGrotesk-Semibold.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/Gilroy-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/HelveticaNeueCyr-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/Onest-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/PublicSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/PublicSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
                    <link rel="preload" href="/fonts/PublicSans-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="" />

                    <meta property="og:url" content={'https://...' + (meta.url || '')} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="canonical" href="https://..." />
                    <meta property="og:type" content="business.business" />
                    <meta
                        name="keywords"
                        content={
                            keywords ||
                            'Agency, Design, QClay, UI/UX, UI, UX, Figma, Development, Web, Front-end, Back-End, Mobile, Flutter'
                        }
                    />
                </Head>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
