import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from 'shared/components/@buttons/button';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { IBrandLogo } from 'widgets/03-brand-screens/lib/types';
import css from './logo.module.scss';
import clsx from 'clsx';
import { MediaQuery } from 'shared/ui/media-query';

export const Logo: React.FC = () => {
    const logos = useTranslationObject<IBrandLogo[]>('logo.logos', 'brand-assets');
    const [activeLogo, setActiveLogo] = useState(logos[0]);
    const { t } = useTranslation('brand-assets');

    const getBackground = (background: string) => {
        const key = background.includes('url') ? 'backgroundImage' : 'backgroundColor';

        return {
            [key]: background,
            backgroundPosition: 'center',
            backgroundSize: 'cover'  
        }
    }
    
    return (
        <section className={css.logo}>
            <div className="container">
                <div className={css.wrapper}>

                    <div className={css.header}>
                        <h2 className={css.suptitle}>
                            {t('logo.suptitle')}
                        </h2>

                        <MediaQuery 
                            query="(min-width: 566px)"
                            children={
                                <Button 
                                    className={css.button}
                                    text={t('logo.button')}
                                    variant="pink-outlined"
                                    href={activeLogo.img}
                                    component="a"
                                    download
                                />
                            }
                        />
                    </div>

                    <div className={css.content}>
                        <div className={css.content_left}>
                            <ul className={css.list}>
                                {logos.map((item, id) => (
                                    <li 
                                        className={clsx(
                                            css.list_item,
                                            item.id === activeLogo.id && css.list_itemActive
                                        )}
                                        style={getBackground(item.background)}
                                        onClick={() => setActiveLogo(item)}
                                        key={item.id}
                                    >
                                        <img 
                                            className={css.list_logo} 
                                            src={item.img} 
                                            alt="" 
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div 
                            className={css.content_right}
                            style={getBackground(activeLogo.backgroundImage || activeLogo.background)}
                        >
                            <img 
                                className={css.logoActive} 
                                src={activeLogo.img} 
                                alt="" 
                            />
                        </div>
                    </div>

                    <MediaQuery 
                        query="(max-width: 565px)"
                        children={
                            <div className={css.centered}>
                                <Button 
                                    className={css.button}
                                    text={t('logo.button')}
                                    variant="pink-outlined"
                                    href={activeLogo.img}
                                    component="a"
                                    download
                                />
                            </div>
                        }
                    />

                </div>
            </div>
        </section>
    );
}