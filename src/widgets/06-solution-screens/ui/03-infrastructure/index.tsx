import React from 'react';
import { useTranslation } from 'next-i18next';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { IInfrastructure } from 'widgets/06-solution-screens/lib/types';
import css from './infrastructure.module.scss';
import { startFromZero } from 'shared/lib/utils/formatter';
import { Button } from 'shared/components/@buttons/button';
import { MediaQuery } from 'shared/ui/media-query';
import { Player } from '@lottiefiles/react-lottie-player';

export const Infrastructure: React.FC = () => {
    const { t } = useTranslation('solutions');
    const items = useTranslationObject<IInfrastructure[]>('infrastructure.items', 'solutions');

    return (
        <section 
            className={css.infrastructure} 
            id="infrastructure"
        >
            <h3 className={css.suptitle}>
                {t('infrastructure.suptitle')}
            </h3>

            <ul className={css.list}>
                {items.map((item, id) => (
                    <li 
                        className={css.list_item} 
                        key={item.title}
                    >
                        <div className={css.list_header}>
                            <MediaQuery 
                                query='(max-width: 991px)'
                                children={
                                    // <img 
                                    //     className={css.list_icon}
                                    //     src={item.icon} 
                                    //     alt="" 
                                    // />
                                    <Player 
                                        className={css.list_icon}
                                        src={item.iconLottie}
                                        loop
                                        autoplay
                                    />
                                }
                            />
                            <p className={css.list_index}>
                                {startFromZero(id + 1)}
                            </p>
                        </div>

                        <h3 className={css.list_title}>
                            {item.title}
                        </h3>

                        <MediaQuery 
                            query='(min-width: 992px)'
                            children={
                                <>
                                    <div className={css.list_spacer} />
                                    <Player 
                                        className={css.list_icon}
                                        src={item.iconLottie}
                                        loop
                                        autoplay
                                    />
                                    {/* <img 
                                        className={css.list_icon}
                                        src={item.icon} 
                                        alt="" 
                                    /> */}
                                </>
                            }
                        />

                        <p className={css.list_text}>
                            {item.text}
                        </p>

                        <div className={css.list_controls}>
                            <Button 
                                className={css.list_button}
                                href={item.url}
                                text={t('infrastructure.learnMore')}
                                component="a"
                                target="_blank"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}