import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { MediaQuery } from 'shared/ui/media-query';
import Sprite from 'shared/ui/sprite';
import { HomeScreensEnum, IHomeAbout } from 'widgets/01-home-screens/lib/types';
import css from './about.module.scss';
import Image from 'shared/ui/image';

const About: React.FC = () => {
    const aboutList = useTranslationObject<IHomeAbout[]>('about.list', 'home');
    const { t } = useTranslation('home');

    return (
        <section
            className={css.about}
            id={HomeScreensEnum.ABOUT}
        >
            <div className="container">
                <div className={css.wrapper}>
                    <picture>
                        <source 
                            srcSet="/img/home/about-gradient.webp" 
                            type="image/webp" 
                        />
                        <img 
                            className={css.image}
                            width={640}
                            height={480}
                            src="/img/home/about-gradient.png" 
                            alt="" 
                        />
                    </picture>

                    <div className={css.box}>
                        <div className={css.content}>
                            <div className={css.content_left}>
                                <h2 
                                    className={css.content_title} 
                                    dangerouslySetInnerHTML={{
                                        __html: t('about.title')
                                    }}
                                />
                            </div>

                            <div className={css.content_right}>
                                <MediaQuery 
                                    query="(min-width: 769px)"
                                    children={
                                        <Button 
                                            text={t('about.startBuilding')}
                                            className={css.content_button}
                                            component="a"
                                            target="_blank"
                                            href="https://docs.taiko.xyz/start-here/getting-started"
                                            animated
                                        />
                                    }
                                />
                            </div>

                        </div>

                        <ul className={`${css.list} aos`} data-aos-offset="30%">
                            {aboutList.map((item) => (
                                <li 
                                    className={css.list_item}
                                    key={item.title}
                                >
                                    <div className={css.list_icon}>
                                        <Sprite.Default icon={item.icon} />
                                    </div>

                                    <h3 className={css.list_title}>
                                        {item.title}
                                    </h3>

                                    <p className={css.list_text}>
                                        {item.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        
                        <MediaQuery 
                            query="(max-width: 768px)"
                            children={
                                <Button 
                                    text={t('about.startBuilding')}
                                    className={css.content_button}
                                    component="a"
                                    target="_blank"
                                    href="https://docs.taiko.xyz/start-here/getting-started"
                                    animated
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;