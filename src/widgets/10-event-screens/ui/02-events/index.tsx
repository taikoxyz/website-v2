import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { TaikoSelect } from 'shared/components/taiko-select';
import { IEventLocation, IEventsResponse } from 'shared/lib/types';
import { fileServerPath } from 'shared/lib/utils/file-server-path';
import { MediaQuery } from 'shared/ui/media-query';
import Sprite from 'shared/ui/sprite';
import { EventsApiEnum,  } from 'widgets/10-event-screens/lib/types';
import { EventItem } from '../02.01-event-item';
import { eventApi } from 'shared/lib/api';
import { eventGetMonths, eventTransformLocations, getEventQuery } from 'widgets/10-event-screens/lib';
import { useObjectState } from 'shared/lib/hooks/use-object-state';
import css from './events.module.scss';

const temp = [
    { name: "Options 1", value: 'opt-1' },
    { name: "Options 2", value: 'opt-2' },
    { name: "Options 3", value: 'opt-3' },
    { name: "Options 4", value: 'opt-4' },
]

export const Events: React.FC = () => {
    const [locations, setLocations] = useState<IEventLocation[]>([]);
    
    const [filter,, { setStateValue: setFilterValue }] = useObjectState({
        month: eventGetMonths()[0],
        location: eventTransformLocations([])[0]
    });

    const { t } = useTranslation('events');
    const { data } = useQuery<IEventsResponse>({ 
        queryKey: [
            EventsApiEnum.ALL_EVENTS,
            getEventQuery(filter)
        ],
        queryFn: () => eventApi.getAll(getEventQuery(filter)) 
    });

    useEffect(() => {
        eventApi.getLocations()
            .then((data) => setLocations(data));
    }, []);
    
    const locationOptions = useMemo(
        () => eventTransformLocations(locations),
        [locations]
    );

    const monthOptions = useMemo(
        () => eventGetMonths(),
        []
    );
    
    return (
        <section className={css.events}>
            <div className="container">
                <div className={css.wrapper}>

                    <div className={css.left}>
                        <h2 className={css.title}>
                            <span>{t('eventSchedule')}</span>
                            <Sprite.Default icon="arrow-right" />
                        </h2>
                    </div>

                    <div className={css.right}>
                        <div className={css.head}>
                            <MediaQuery 
                                query="(min-width: 769px)"
                                children={
                                    <p className={css.head_event}>
                                        {t('eventName')}
                                    </p>
                                }
                            />
                            <div className={css.head_420}>
                                <div className={css.head_column}>
                                    <TaikoSelect 
                                        text={t('location')}
                                        value={filter.location}
                                        options={locationOptions}
                                        onChange={(data) => data && setFilterValue('location', data)}
                                    />
                                </div>
                                <div className={css.head_column}>
                                    <TaikoSelect 
                                        text={t('month')}
                                        value={filter.month}
                                        options={monthOptions}
                                        onChange={(data) => data && setFilterValue('month', data)}
                                    />
                                </div>
                            </div>
                            <MediaQuery 
                                query="(min-width: 769px)"
                                children={
                                    <div className={css.head_controls} />
                                }
                            />
                        </div>
                        <ul className={css.list}>
                            {(data?.results || []).map((item) => (
                                <li
                                    className={css.list_item}
                                    key={item.id}
                                >
                                    <EventItem 
                                        img={fileServerPath(item.image.url)}
                                        date={item.date}
                                        location={item.location}
                                        title={item.title}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}