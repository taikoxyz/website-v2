import dayjs from 'dayjs';
import React from 'react';
import Sprite from 'shared/ui/sprite';
import { useArticle } from 'widgets/09-article-screens/lib';
import css from './hero.module.scss';

export const Hero: React.FC = () => {
    const article = useArticle();

    return (
        <section 
            className={css.hero}
        >
            <p className={css.tag}>
                {article.category.name}
            </p>

            <h1 className={css.title}>
                {article.title}
            </h1>

            <ul className={css.info}>
                <li className={css.info_item}>
                    <Sprite.Default icon="calendar" />
                    <span>{dayjs(article.createdAt).format('DD MMM YYYY')}</span>
                </li>
                <li className={css.info_item}>
                    <Sprite.Default icon="timer" />
                    <span>{article.timeToRead}</span>
                </li>
            </ul>
        </section>
    );
}