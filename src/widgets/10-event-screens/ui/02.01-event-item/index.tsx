import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import Sprite from 'shared/ui/sprite';
import css from './event-item.module.scss';

interface Props {
    img: string;
    title: string;
    location: string;
    date: string;
}

export const EventItem: React.FC<Props> = ({
    date,
    img,
    location,
    title,
}) => {
    return (
        <div className={css.event}>
            <img 
                className={css.image} 
                src={img} 
                alt="" 
            />

            <h3 className={css.title}>
                {title}
            </h3>

            <div className={css.column_420}>
                <p className={css.column_text}>
                    {location}
                </p>
                <p className={css.column_text}>
                    {dayjs(date).format('MMMM D')}th
                </p>
            </div>

            <div className={css.controls}>
                <Link 
                    className={css.moreBtn} 
                    href="#"
                >
                    <span>More</span>
                    <Sprite.Default icon="arrow-right" />
                </Link>
            </div>
        </div>
    );
}