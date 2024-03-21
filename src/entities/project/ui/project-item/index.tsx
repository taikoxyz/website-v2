import clsx from 'clsx';
import React from 'react';
import { IProjectCategory } from 'shared/lib/types';
import css from './project-item.module.scss';

interface Props {
    url: string;
    iconSrc: string;
    title: string;
    text: string;
    type: string;
    categories: IProjectCategory[];
}

export const ProjectItem: React.FC<Props> = ({
    url,
    categories,
    iconSrc,
    text,
    type,
    title,
}) => {
    return (
        <a 
            href={url} 
            className={css.project}
            target="_blank"
        >
            <div className={css.head}>
                <img 
                    className={css.icon} 
                    src={iconSrc} 
                    alt="" 
                />

                <p className={clsx(
                    css.label,
                    type === 'Testnet' && css.labelTestnet
                )}>
                    <span>{type}</span>
                </p>
            </div>

            <p className={css.title}>
                {title}
            </p>

            <p className={css.text}>
                {text}
            </p>

            {categories.length > 0 && (
                <ul className={css.categories}>
                    {categories.map((category) => (
                        <li 
                            className={css.categories_item}
                            key={category.id}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </a>
    );
}