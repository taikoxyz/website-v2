import React from 'react';
import { getCareerURL } from 'entities/career';
import { ICareer } from 'shared/lib/types';
import { CareerItem } from '../career-item';
import css from './career-list.module.scss';

interface Props {
    data: ICareer[];
}

export const CareerList: React.FC<Props> = ({
    data
}) => {
    return (
        <div className={css.careers}>
            <ul className={css.career_list}>
                {data.map((item) => (
                    <li 
                        className={css.career_item}
                        key={item.id}
                    >
                        <CareerItem
                            title={item.title} 
                            location={item.location}
                            type={item.type}
                            url={getCareerURL(item.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}