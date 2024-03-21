import React from 'react';
import { useTranslation } from 'next-i18next';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { MediaQuery } from 'shared/ui/media-query';
import { IFooterLink } from 'widgets/footer/lib/types';
import css from './footer-nav.module.scss';

export const FooterNav: React.FC = () => {
    const { t } = useTranslation('footer');
    const nav = useTranslationObject<IFooterLink[]>('nav', 'footer');
   
    return (
        <div className={css.root}>

            <div className={css.content}>
                <p className={css.title}>
                    {t('content.title')}
                </p>
                <p className={css.text}>
                    {t('content.text')}
                </p>
                <MediaQuery 
                    query="(max-width: 1124px)"
                    children={
                        <p className={css.copyright}>
                            {t('copyright')}
                        </p>
                    }
                />
            </div>

            <nav className={css.nav}>
                <ul className={css.nav_list}>
                    {nav.map((item) => (
                        <li
                            className={css.nav_item} 
                            key={item.title}
                        >
                            <p className={css.nav_title}>
                                {item.title}
                            </p>

                            {item.list.map((link) => (
                                <a 
                                    className={css.nav_link}
                                    href={link.url}
                                    key={link.name}    
                                    target="_blank"
                                >
                                    <span>{link.name}</span>
                                </a>
                            ))}
                        </li>
                    ))}
                </ul>

                <MediaQuery 
                    query="(min-width: 1125px)"
                    children={
                        <p className={css.copyright}>
                            {t('copyright')}
                        </p>
                    }
                />
            </nav>

        </div>
    );
}