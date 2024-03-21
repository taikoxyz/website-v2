import Link from 'next/link';
import React from 'react';
import Sprite from 'shared/ui/sprite';
import css from './career-item.module.scss';

interface Props {
    title: string;
    location: string;
    type: string;
    url: string;
}

export const CareerItem: React.FC<Props> = ({
    title,
    location,
    type,
    url,
}) => {
    return (
        <div className={css.career}>
            <div className={css.column_grow}>
                <h3 className={css.title}>{title}</h3>
            </div>

            <div className={css.column_420}>
                <p className={css.text}>{location}</p>
                <p className={css.text}>{type}</p>
            </div>

            <div className={css.column_70}>
                <Link 
                    className={css.link}
                    href={url}
                >
                    More
                    <Sprite.Default icon="arrow-right" />
                </Link>
            </div>
        </div>
    );
}