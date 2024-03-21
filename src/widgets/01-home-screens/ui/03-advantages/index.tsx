import React from 'react';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import Sprite from 'shared/ui/sprite';
import { HomeScreensEnum, IHomeAdvantage } from 'widgets/01-home-screens/lib/types';
import css from './advantages.module.scss';

const Advantages: React.FC = () => {
    const advantages = useTranslationObject<IHomeAdvantage[]>(
        'advantages', 
        'home'
    );

    return (
        <section
            className={css.advantages}
            id={HomeScreensEnum.ADVANTAGES}
        >
            <div className="container">
                <ul className={css.list}>
                    {advantages.map((item) => (
                        <li 
                            id={item.id}
                            className={css.list_item}
                            key={item.title}
                        >
                            <div className={css.list_border} />

                            <div 
                                className={css.list_icon}
                                data-icon
                            >
                                <Sprite.Default 
                                    style={{ fill: item.colors.icon }}
                                    icon={item.icon} 
                                />
                            </div>

                            <p
                                className={css.list_title}
                                style={{ color: item.colors.text }}
                            >
                                {item.title}
                            </p>

                            <p 
                                className={css.list_text}
                                style={{ color: item.colors.text }}
                            >
                                {item.text}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Advantages;