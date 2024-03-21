import { useTranslation } from 'next-i18next';
import React from 'react';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { MediaQuery } from 'shared/ui/media-query';
import Sprite from 'shared/ui/sprite';
import { IGrantDate } from 'widgets/11-grant-screens/lib/types';
import css from './key-dates.module.scss';

export const KeyDates: React.FC = () => {
    const dates = useTranslationObject<IGrantDate[]>('keyDates.items', 'grant-program');
    const { t } = useTranslation('grant-program');
    
    return (
        <section className={css.dates}>
            <div className="container">
                <div className={css.content}>
                    <div className={css.content_left}>
                        <h2 className={css.title}>
                            <span>{t('keyDates.title')}</span>
                            <Sprite.Default icon="arrow-right" />
                        </h2>
                    </div>
                    
                    <div className={css.content_right}>
                        <MediaQuery 
                            query="(min-width: 769px)"
                            children={
                                <div className={css.titles}>
                                    <p className={css.titles_date}>
                                        {t('keyDates.dateTitle')}
                                    </p>
                                    <p className={css.titles_description}>
                                        {t('keyDates.descriptionTitle')}
                                    </p>
                                </div>
                            }
                        />

                        <ul className={css.list}>
                            {dates.map((item) => (
                                <li 
                                    className={css.list_item} 
                                    key={item.date}
                                >
                                    <h3 className={css.list_title}>
                                        {item.date}
                                    </h3>
                                    <p className={css.list_description}>
                                        {item.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}