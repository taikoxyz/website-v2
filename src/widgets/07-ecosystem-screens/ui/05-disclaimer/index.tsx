import { useTranslation } from 'next-i18next';
import React from 'react';
import css from './disclaimer.module.scss';

export const Disclaimer: React.FC = () => {
    const { t } = useTranslation('ecosystem');

    return (
        <section className={css.disclaimer}>
            <div className={css.wrapper}>
                <p className={css.content}>
                    {t('disclaimer.subtitle')}
                    <a href="https://github.com/taikoxyz/website-v2" target="_blank" rel="noopener noreferrer" className={css.link}>
                        https://github.com/taikoxyz/website-v2
                    </a>.
                </p>
            </div>
        </section>
    );
}