import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { CSSTransition } from 'react-transition-group';
import { useApp } from 'app/providers/withApp';
import { MediaQuery } from 'shared/ui/media-query';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { IHeaderLink } from 'widgets/header/lib/types';
import { LinkDropdown } from 'shared/components/link-dropdown';
import Sprite from 'shared/ui/sprite';
import { IFooterSocial } from 'widgets/footer/lib/types';
import css from './menu.module.scss';

export const Menu: React.FC = () => {
    const navigation = useTranslationObject<IHeaderLink[]>('navigation', 'header');
    const socials = useTranslationObject<IFooterSocial[]>('socials', 'footer');
    const { t } = useTranslation('footer');
    const [{ menuActive }] = useApp();

    useEffect(() => {
        document.body.style.overflow =
            menuActive 
                ? "hidden"
                : "";
    }, [menuActive]);

    return (
        <MediaQuery 
            query="(max-width: 768px)"
            children={
                <CSSTransition
                    classNames={css}
                    timeout={400}
                    in={menuActive}
                    unmountOnExit
                    mountOnEnter
                >
                    <menu className={css.menu}>

                        <div className={css.menu_wrapper}>
                            <h3 className={css.menu_title}>
                                Menu
                            </h3>

                            <nav className={css.menu_nav}>
                                {navigation.map((link) => (
                                    <LinkDropdown 
                                        name={link.name}
                                        links={link.links}
                                        key={link.name}
                                        solid
                                    />
                                ))}
                            </nav> 

                            <h3 
                                className={css.menu_join} 
                                dangerouslySetInnerHTML={{
                                    __html: t('joinTaiko')
                                }}
                            />

                            <nav className={css.menu_socials}>
                                {socials.map((social) => (
                                    <a 
                                        className={css.menu_link}
                                        href={social.url}
                                        key={social.url}
                                        target="_blank"
                                    >
                                        {social.name}
                                        {social.name === "mirror"
                                            ? <img src="/img/mirror-logo.png" alt="" />
                                            : <Sprite.Default icon={social.icon} />}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <img 
                            className={css.background} 
                            src="/img/menu_background.png" 
                            alt="" 
                        />
                    </menu>
                </CSSTransition>
            }
        />
    );
}