import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Sprite from 'shared/ui/sprite';
import { SideNav } from '../07.01-side-nav';
import { Share } from '../07.02-share';
import css from './side.module.scss';

export const Side: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className={css.side}>
            <Link
                className={css.backButton}
                href="/blog"
            >
                {t('blogTitle')}
                <div className={css.backContent}>
                    <Sprite.Default icon="arrow-right" />
                    <span>{t('blogTitle')}</span>
                </div>
            </Link>

            <nav className={css.nav}>
                <SideNav />
            </nav>

            <div className={css.share}>
                <Share />
            </div>
        </div>
    );
}