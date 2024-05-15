import { Player } from '@lottiefiles/react-lottie-player';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { MediaQuery } from 'shared/ui/media-query';
import { HeroDapps } from '../01.01-hero-dapps';
import css from './hero.module.scss';

export const Hero: React.FC = () => {
    const { t } = useTranslation('ecosystem');
    
    return (
        <section className={css.hero}>
            <div className="container">
                <div className={css.wrapper}>
                    <MediaQuery 
                        query="(min-width: 769px)"
                        children={
                            <Player 
                                className={css.image}
                                src="/img/home/ecosystem.json"
                                rendererSettings={{
                                    preserveAspectRatio: "xMidYMid slice"
                                }}
                                autoplay
                                loop
                            />
                        }   
                    />

                    <MediaQuery 
                        query="(max-width: 768px)"
                        children={
                            <Player 
                                className={css.image}
                                src="/img/home/ecosystem.mob.v2.json"
                                rendererSettings={{
                                    preserveAspectRatio: "xMidYMid slice"
                                }}
                                autoplay
                                loop
                            />
                        }   
                    />

                    <div className={css.content}>
                        <div className={css.content_left}>

                            <h1 
                                className={css.title} 
                                dangerouslySetInnerHTML={{
                                    __html: t('title')
                                }}
                            />

                            <MediaQuery 
                                query="(min-width: 769px)"
                                children={
                                    <div className={css.dapps}>
                                        <HeroDapps />
                                    </div>
                                }
                            />

                        </div>

                        <div className={css.content_right}>
                            <div className={css.card}>

                                {/* <MediaQuery 
                                    query="(min-width: 769px)"
                                    children={
                                        <h3 className={css.card_suptitle}>
                                            {t('suptitle')}
                                        </h3>
                                    }
                                /> */}

                                <p className={css.card_text}>
                                    {t('text')}
                                </p>

                                <Button 
                                    className={css.card_button}
                                    text={t('joinOurEcosystem')}
                                    component="a"
                                    target="_blank"
                                    href="https://github.com/taikoxyz/website-v2/issues/new?assignees=&labels=category.enhancement%2Cstatus.needs-triage&projects=&template=add_project.yml"
                                />

                                <MediaQuery 
                                    query="(max-width: 768px)"
                                    children={
                                        <div className={css.card_dapps}>
                                            <HeroDapps />
                                        </div>
                                    }
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}