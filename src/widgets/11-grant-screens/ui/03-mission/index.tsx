import { useTranslation } from 'next-i18next';
import React from 'react';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { IGrantMission } from 'widgets/11-grant-screens/lib/types';
import css from './mission.module.scss';

export const Mission: React.FC = () => {
    const missions = useTranslationObject<IGrantMission[]>('mission.items', 'grant-program');
    const { t } = useTranslation('grant-program');
    
    return (
        <section className={css.mission}>
            <div className="container">
                <h2 
                    className={css.title} 
                    dangerouslySetInnerHTML={{
                        __html: t('mission.title')
                    }}
                />

                <ul className={css.list}>
                    {missions.map((item) => (
                        <li 
                            className={css.list_item}
                            key={item.title}
                        >
                            <img 
                                className={css.list_icon}
                                src={item.icon}
                                alt="" 
                            />

                            <h3 className={css.list_title}>
                                {item.title}
                            </h3>

                            <p className={css.list_text}>
                                {item.text}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}