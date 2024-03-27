import { useTranslation } from 'next-i18next';
import React from 'react';
import css from './hero-dapps.module.scss';

export const HeroDapps: React.FC = () => {
    const { t } = useTranslation('ecosystem');
    
    return (
        <div className={css.dapps}>
            <div className={css.logos}>
                {[1,2,3,4].map((id) => (
                    <img 
                        className={css.logos_item}
                        src={`/img/home/ec-${id}.png`}
                        alt=""
                    />
                ))}
            </div>

            <div className={css.content}>
                <p className={css.title}>100+</p>
                <p className={css.text}>{t('dapps')}</p>
            </div>
        </div>
    );
}