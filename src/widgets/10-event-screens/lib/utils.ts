import { IEventLocation } from 'shared/lib/types';
import qs from 'qs';
import dayjs from 'dayjs';

const formatter = (n: number) => n.toString().padStart(2, '0');

export const eventTransformLocations = (data: IEventLocation[]) => {
    return [{ name: 'ALL', value: 'all' }, ...data.map(({ name }) => ({ name, value: name }))];
};

export const eventGetMonths = () => {
    return [
        { name: 'ALL', value: -1 },
        ...[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ].map((month, id) => ({
            name: month,
            value: id + 1,
        })),
    ];
};

interface IFilter {
    month: ReturnType<typeof eventGetMonths>[0];
    location: ReturnType<typeof eventTransformLocations>[0];
}

export const getEventQuery = (data: IFilter) => {
    const query: any = {};

    if(data.month.value !== -1) {
        let year = +dayjs().format('YYYY');
        let toYear = year;
        let toMonth = data.month.value;

        if(toMonth + 1 > 12) {
            toMonth = 1;
            toYear += 1;
        }

        query.month = {
            from: `${year}-${formatter(data.month.value)}-01`,
            to: `${toYear}-${formatter(toMonth)}-01`
        }
    }

    if(data.location.value !== 'all') {
        query.location = data.location.value;
    }
    
    return qs.stringify(query);
}