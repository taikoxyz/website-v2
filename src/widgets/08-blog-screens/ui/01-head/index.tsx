import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { MediaQuery } from 'shared/ui/media-query';
import Sprite from 'shared/ui/sprite';
import { SideFilters } from '../side-filters';
import css from './head.module.scss';

export const Head: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState(false);
    const { t } = useTranslation();
    
    return (
        <div className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>
                    {t('blogTitle')}
                </h2>

                <MediaQuery 
                    query="(max-width: 1124px)"
                    children={
                        <button 
                            className={css.filterBtn}
                            onClick={() => setActiveFilter(!activeFilter)}
                        >
                            <span>Filters</span>
                            <Sprite.Default 
                                style={{ transform: activeFilter ? "rotate(-90deg)" : "" }}
                                icon="arrow-right" 
                            />
                        </button>
                    }
                />
            </header>

            {activeFilter && (
                <MediaQuery 
                    query="(max-width: 1124px)"
                    children={
                        <SideFilters />
                    }
                />
            )}
        </div>
    );
}