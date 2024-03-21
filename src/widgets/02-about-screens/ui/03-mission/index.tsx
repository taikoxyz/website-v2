import { useTranslation } from 'next-i18next';
import React from 'react';
import { MediaQuery } from 'shared/ui/media-query';
import Sprite from 'shared/ui/sprite';
import { AboutScreensEnum } from 'widgets/02-about-screens/lib/types';
import css from './mission.module.scss';

export const Mission: React.FC = () => {
    const { t } = useTranslation('about');

    return (
        <section 
            className={css.mission}
            id={AboutScreensEnum.MISSION}
        >
            <div className="container">
                <div className={css.wrapper}>
                    <div className={css.image}>
                        <picture>
                            <source srcSet="/img/about/mission-card.webp" type="image/webp" />
                            <img src="/img/about/mission-card.jpg" alt="" />
                        </picture>
                    </div>

                    <div className={css.content}>
                        <div className={css.card}>
                            <p className={css.card_suptitle}>
                                {t('mission.suptitle')}
                            </p>

                            <h2 className={css.card_title}>
                                {t('mission.title')}
                            </h2>
                        </div>

                        <div className={css.info}>
                            <div className={css.info_icon}>
                                <div className={css.info_icon_circle}>
                                    <Sprite.Default icon="shape:clock" />
                                </div>
                            </div>

                            <h3 className={css.info_suptitle}>
                                {t('mission.fact.title')}
                            </h3>

                            <div className={css.info_row}>
                                <MediaQuery 
                                    query="(min-width: 1124px)"
                                    children={
                                        <p className={css.info_percent}>
                                            96%
                                        </p>
                                    }
                                />

                                <ul className={css.info_list}>
                                    <li className={css.info_list_item}>
                                        {t('mission.fact.text_1')}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}