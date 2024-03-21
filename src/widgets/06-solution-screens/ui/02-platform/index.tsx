import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { ISolution } from 'widgets/06-solution-screens/lib/types';
import css from './platform.module.scss';

export const Platform: React.FC = () => {
    const { t } = useTranslation('solutions');
    const solutions = useTranslationObject<ISolution[]>('platform.items', 'solutions');

    return (
        <section className={css.platform}>

            <div className={css.row}>
                <p className={css.suptitle}>
                    {t('platform.suptitle')}
                </p>
                
                <Button 
                    className={css.button}
                    text={t('platform.learnMore')}
                    component="a"
                    href="/about"
                    variant="pink-outlined"
                />
            </div>

            <ul className={css.list}>
                {solutions.map((item) => (
                    <li 
                        className={css.list_item}
                        key={item.title}
                    >
                        <div className={css.list_content}>
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

                            <Button 
                                className={css.list_button}
                                text={`${t('platform.goTo')} ${item.title}`}
                                variant="pink-outlined"
                                component="a"
                                href={item.url}
                            />
                        </div>

                        <div className={css.list_image}>
                            <picture>
                                <source srcSet={item.image.webp} type="image/webp" />
                                <img src={item.image.default} alt="" />
                            </picture>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}