import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'shared/components/@buttons/button';
import css from './ecosystem-content.module.scss';

const EcosystemContent: React.FC = () => {
    const { t } = useTranslation('home'); 
    
    return (
        <div className={css.content}>
            <ul className={css.list}>
                {t('ecosystem.title').split('\n').map((item) => (
                    <li 
                        className={css.list_item} 
                        key={item}
                    >
                        <h2 className={css.title}>
                            {item}
                        </h2>
                    </li>
                ))}
                

                <li className={css.list_item}>
                    <p className={css.text}>
                        {t('ecosystem.text')}
                    </p>
                </li>

                <li className={css.list_item}>
                    <Button 
                        className={css.button}
                        text={t('ecosystem.exploreButton')}
                        animated={{ offset: '10%' }}
                        component="a"
                        href="/ecosystem"
                    />
                </li>
            </ul>
        </div>
    );
}

export default EcosystemContent;