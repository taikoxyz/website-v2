import React from 'react';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import Sprite from 'shared/ui/sprite';
import { IFooterSocial } from 'widgets/footer/lib/types';
import css from './footer-socials.module.scss';

export const FooterSocials: React.FC = () => {
    const socials = useTranslationObject<IFooterSocial[]>('socials', 'footer');

    return (
        <div 
            className={css.socials}
        >
            {socials.map((social) => (
                <a 
                    className={css.socials_link}
                    href={social.url}
                    key={social.url}
                    target="_blank"
                >
                    {social.name}
                    <div className={css.socials_wrapper}>
                        {social.name === "mirror" 
                            ? <img src="/img/mirror-logo.png" alt="" />
                            : <Sprite.Default icon={social.icon} />}
                        <span>{social.name}</span>
                    </div>
                </a>
            ))}
        </div>
    );
}