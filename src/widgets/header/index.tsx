import React from 'react';
import Link from 'next/link';
import Sprite from 'shared/ui/sprite';
import { IHeaderLink, IHeaderSocial } from './lib/types';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import css from './header.module.scss';
import { MediaQuery } from 'shared/ui/media-query';
import { LinkDropdown } from 'shared/components/link-dropdown';
import { useApp } from 'app/providers/withApp';
import clsx from 'clsx';

interface Props {
    theme?: "light" | "dark";
    fixed?: boolean;
}

export const Header: React.FC<Props> = ({
    theme = "light",
    fixed
}) => {
    const navigation = useTranslationObject<IHeaderLink[]>('navigation', 'header');
    const socials = useTranslationObject<IHeaderSocial[]>('socials', 'header');
    const [state,, { setStateValue }] = useApp();

    return (
        <header 
            className={clsx(
                css.header, 
                css['header_' + theme],
                fixed && css.header_fixed
            )} 
            style={{ background: state.menuActive ? "$kColorThemeWhite" : "" }}
            id="header"
        >
            <div className="container">
                <div className={css.wrapper}>

                    <Link 
                        className={css.logo} 
                        href="/"
                        data-logo
                    >   
                        Taiko
                        <Sprite.Default icon="logo" />
                    </Link>

                    <MediaQuery 
                        query="(min-width: 769px)"
                        children={
                            <>
                                <nav className={css.nav}>
                                    {navigation.map((link) => (
                                        <LinkDropdown 
                                            name={link.name}
                                            links={link.links}
                                            key={link.name}
                                        />
                                    ))}
                                </nav> 

                                <div className={css.socials}>
                                    {socials.map((social) => (
                                        <a
                                            className={css.socials_link}
                                            href={social.url}
                                            key={social.url}
                                            target="_blank"
                                            data-social
                                        >
                                            {social.icon.split(':')[1]}
                                            <Sprite.Default icon={social.icon} />
                                        </a>
                                    ))}
                                </div>
                            </>
                        }
                    />

                    <MediaQuery 
                        query="(max-width: 768px)"
                        children={
                            <button 
                                className={clsx(
                                    css.menuBtn,
                                    state.menuActive && css.menuBtnActive
                                )}
                                onClick={() => setStateValue('menuActive', !state.menuActive)}
                            >
                                <span className={css.menuBtn_wrapper} />
                                Menu
                            </button>
                        }
                    />
                </div>
            </div>
        </header>
    );
};
