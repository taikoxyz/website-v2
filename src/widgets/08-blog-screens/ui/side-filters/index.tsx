import React from 'react';
import { useTranslation } from 'next-i18next';
import { FilterDate } from '../filter-date';
import { FilterCategory } from '../filter-category';
import { createBlogFilter, useBlogFilter } from 'widgets/08-blog-screens/provider';
import css from './side-filters.module.scss';

export const SideFilters: React.FC = () => {
    const { state, setState } = useBlogFilter();
    const { t } = useTranslation();

    const onReset = () => setState(createBlogFilter())

    return (
        <div className={css.side}>
            
            <div className={css.headers}>
                <h4 className={css.title}>
                    {t('filtersTitle')}
                </h4>
                {(state.dateRange.key !== 'all' || state.topic.value !== 'all') && (
                    <button 
                        className={css.resetBtn} 
                        onClick={onReset}
                    >
                        Reset
                    </button>
                )}
            </div>
            <div className={css.filters}>
                <FilterDate />
                <FilterCategory />
            </div>
        </div>
    );
}