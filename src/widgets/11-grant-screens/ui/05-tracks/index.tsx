import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { MediaQuery } from 'shared/ui/media-query';
import { IGrantTrack } from 'widgets/11-grant-screens/lib/types';
import css from './tracks.module.scss';

export const Tracks: React.FC = () => {
    const tracks = useTranslationObject<IGrantTrack[]>('track.items', 'grant-program');
    const { t } = useTranslation('grant-program');
    
    
    return (
        <section className={css.tracks}>
            <div className="container">
                <h2 className={css.title}>
                    {t('track.title')}
                </h2>
                
                <ul className={css.list}>
                    {tracks.map((item) => (
                        <li 
                            className={clsx(css.list_item, !item.active && css.list_itemDeactivated)} 
                            key={item.title}
                        >
                            <div className={css.content}>
                                <div className={css.content_header}>
                                    <img 
                                        className={css.content_icon}
                                        src={item.icon} 
                                        alt="" 
                                    />

                                    <div className={css.content_column}>
                                        <h3 className={css.content_title}>
                                            {item.title}
                                        </h3>

                                        <p className={css.content_track}>
                                            {item.track}
                                        </p>
                                    </div>

                                    {item.active && <MediaQuery 
                                        query="(min-width: 769px)"
                                        children={
                                            <Button 
                                                component="a"
                                                href={item.link}
                                                target="_blank"
                                                className={css.content_button}
                                                text={t('track.applyNow')}
                                                variant="pink-outlined"
                                            />
                                        }
                                    />}
                                </div>

                                <p 
                                    className={css.content_text} 
                                    dangerouslySetInnerHTML={{
                                        __html: item.text
                                    }}
                                />
                            </div>

                            <div className={css.footer}>
                                <MediaQuery 
                                    query="(min-width: 657px)"
                                    children={
                                        <h4 className={css.footer_title}>
                                            Timeline
                                        </h4>
                                    }   
                                />
                                
                                <p 
                                    className={css.footer_text}
                                    dangerouslySetInnerHTML={{
                                        __html: item.timeline
                                    }}
                                />
                            </div>

                            <MediaQuery 
                                query="(max-width: 768px)"
                                children={
                                    <Button 
                                        component="a"
                                        href={item.link}
                                        data-class="blog"
                                        target="_blank"
                                        className={css.content_button}
                                        text={t('track.applyNow')}
                                        variant="pink-outlined"
                                    />
                                }
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}