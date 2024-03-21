import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import Sprite from 'shared/ui/sprite';
import { CareerList } from 'entities/career';
import { CareerApiEnum } from 'widgets/04-career-screens/lib/types';
import { ICareer, ICareersResponse } from 'shared/lib/types';
import { MediaQuery } from 'shared/ui/media-query';
import { TaikoSelect } from 'shared/components/taiko-select';
import { useObjectState } from 'shared/lib/hooks/use-object-state';
import { SelectItem } from 'shared/ui/select';
import css from './positions.module.scss';

const sortLocation = [
    { name: 'ALL', value: 'ALL' },
    { name: 'Remote', value: 'remote' },
    { name: 'Office', value: 'office' },
];

const sortTypes = [
    { name: 'ALL', value: 'ALL' },
    { name: 'Full-Time', value: 'full-time' },
    { name: 'Part-Time', value: 'part-time' },
];

interface State {
    type: SelectItem;
    location: SelectItem;
}

export const Positions: React.FC = () => {
    const { data } = useQuery<ICareersResponse>({
        queryKey: [CareerApiEnum.ALL_POSITIONS],
    });
    const { t } = useTranslation('careers');

    const [values, , { setStateValue }] = useObjectState<State>({
        type: sortTypes[0],
        location: sortLocation[0],
    });

    const positions = useMemo(() => {
        const careers: ICareer[] = [];

        for (let item of data?.results || []) {
            if (
                values.type.value !== 'ALL' &&
                values.type.name.toString().toLowerCase() !== item.type.toLowerCase()
            ) {
                continue;
            }

            if (
                values.location.value !== 'ALL' &&
                values.location.name.toString().toLowerCase() !== item.location.toLowerCase()
            ) {
                continue;
            }

            careers.push(item);
        }

        return careers;
    }, [data, values]);

    return (
        <section className={css.positions}>
            <div className="container">
                <div className={css.wrapper}>
                    <div className={css.left}>
                        <h3 className={css.title}>
                            <span>{t('positions.title')}</span>
                            <Sprite.Default icon="arrow-right" />
                        </h3>
                    </div>

                    <div className={css.right}>
                        <div className={css.head}>
                            <MediaQuery
                                query="(min-width: 769px)"
                                children={
                                    <div className={css.column_grow}>
                                        <p className={css.column_text}>{t('positions.position')}</p>
                                    </div>
                                }
                            />

                            <div className={css.column_420}>
                                <div className={css.column_item}>
                                    <TaikoSelect
                                        text={t('positions.location')}
                                        value={values.location}
                                        options={sortLocation}
                                        onChange={(data) => data && setStateValue('location', data)}
                                    />
                                </div>
                                <div className={css.column_item}>
                                    <TaikoSelect
                                        text={t('positions.type')}
                                        value={values.type}
                                        options={sortTypes}
                                        onChange={(data) => data && setStateValue('type', data)}
                                    />
                                </div>
                            </div>

                            <MediaQuery
                                query="(min-width: 769px)"
                                children={<div className={css.column_70} />}
                            />
                        </div>

                        <CareerList data={positions} />
                    </div>
                </div>
            </div>
        </section>
    );
};
