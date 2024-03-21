import React, { useMemo, useState } from 'react';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import {
    IBlogDate,
    IBlogDateDefault,
    transformDate,
} from 'widgets/08-blog-screens/lib/transform-filters';
import { BlogFilter } from '../blog-filter';
import { useTranslation } from 'next-i18next';
import { useBlogFilter } from 'widgets/08-blog-screens/provider';
import { RangeCalendar } from 'shared/components/range-calendar';
import clsx from 'clsx';
import dayjs from 'dayjs';
import css from './filter-date.module.scss';

export const FilterDate: React.FC = () => {
    const [active, setActive] = useState(false);
    const date = useTranslationObject<IBlogDateDefault[]>('date', 'blog');
    const { t } = useTranslation();
    const { state, setState } = useBlogFilter();

    const data = useMemo(() => transformDate(date), []);

    const onChange = (item: IBlogDate) => {
        setState({ dateRange: item });

        if (item.key !== 'period') {
            setActive(false);
        }
    };

    const onCancel = () => {
        setActive(false);
        setState({ dateRange: data[0] });
    };

    const onApply = (date: [string, string]) => {
        setState({
            dateRange: {
                ...state.dateRange,
                value: {
                    from: date[0],
                    to: date[1],
                },
            },
        });
        setActive(false);
    };

    const formatDate = useMemo(() => {
        if (state.dateRange.key !== 'period') {
            return state.dateRange.title;
        }
        const { from, to } = state.dateRange.value;

        if (!to || !from) {
            return `From – To, ${dayjs().format('YYYY')}`;
        }

        const years = new Set([
            dayjs(from).get('year').toString(),
            dayjs(to).get('year').toString(),
        ]);

        let fromString = dayjs(from).format('MMM DD');
        let toString = dayjs(to).format('MMM DD');
        let yearString = [...years].join(' – ');

        return `${fromString} – ${toString}, ${yearString}`;
    }, [state.dateRange]);

    return (
        <div className={css.root}>
            <BlogFilter
                active={active}
                setActive={setActive}
                title={t('time')}
                placeholder={formatDate}
                children={
                    <div className={css.content}>
                        {data.map((item) => (
                            <div
                                className={clsx(
                                    css.item,
                                    state.dateRange.key === item.key && css.itemActive
                                )}
                                onClick={() => onChange(item)}
                                key={item.key}
                            >
                                <span>{item.title}</span>
                            </div>
                        ))}

                        {state.dateRange.key === 'period' && (
                            <div className={css.calendar}>
                                <RangeCalendar 
                                    value={[state.dateRange.value.from, state.dateRange.value.to]}
                                    onApply={onApply} 
                                    onCancel={onCancel} 
                                />
                            </div>
                        )}
                    </div>
                }
            />
        </div>
    );
};
