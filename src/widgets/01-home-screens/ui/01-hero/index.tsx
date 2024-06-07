import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { executeOnReadyPage } from 'shared/lib/utils/browser';
import { Button } from 'shared/components/@buttons/button';
import { MediaQuery } from 'shared/ui/media-query';
import Sprite from 'shared/ui/sprite';
import { HomeScreensEnum } from 'widgets/01-home-screens/lib/types';
import HeroLottie from '../01.02-hero-lottie';
import HeroLabels from '../01.01-hero-labels';
import clsx from 'clsx';
import css from './hero.module.scss';

const Hero: React.FC = () => {
    const [complete, setComplete] = useState(false);
    const { t } = useTranslation('home');

    useEffect(() => executeOnReadyPage(() => setComplete(true)), []);

    return (
        <section
            className={clsx(css.hero, css.heroComplete)}
            id={HomeScreensEnum.HERO}
        >
            <HeroLottie />
            <div className={css.box}>
                <div className="container">
                    <div className={css.wrapper}>
                        <div className={css.left}>
                            <h1 className={css.title}>{t('hero.title')}</h1>
                            <p className={css.text}>
                                <MediaQuery
                                    query="(min-width: 769px)"
                                    children={<Sprite.Default icon="square-aim" />}
                                />
                                <span>{t('hero.text')}</span>
                            </p>
                        </div>

                        <div className={css.right}>
                            <div className={css.right_content}>
                                <p className={css.taikoIs}>{t('hero.taiko.is')}</p>

                                <div className={css.label}>
                                    <HeroLabels active={complete} />
                                </div>

                                {complete && (
                                    <div className={css.controls}>
                                        <Button
                                            text={t('hero.startBuilding')}
                                            component="a"
                                            target="_blank"
                                            href="https://docs.taiko.xyz/start-here/getting-started"
                                            animated={{ offset: 0 }}
                                        />
                                        <Button
                                            text={t('hero.bridgeToTaiko')}
                                            animated={{ offset: 0 }}
                                            variant="pink-outlined"
                                            href="https://bridge.taiko.xyz/"
                                            target="_blank"
                                            component="a"
                                            noArrow
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <MediaQuery
                        query="(min-width: 769px)"
                        children={
                            <div className={css.footer}>
                                <p className={css.scrollToExplore}>
                                    <span>{t('hero.scrollToExplore')}</span>
                                    <Sprite.Default icon="arrow-right" />
                                </p>
                            </div>
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
