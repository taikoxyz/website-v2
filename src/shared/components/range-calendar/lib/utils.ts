import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

interface ICalendarObject {
    date: string;
    day: number;
    isToday: boolean;
    isCurrentMonthAndYear: boolean;
}

export const firstDayOfMonth = (day: number) => (day - 1 < 0 ? 6 : day - 1);

export const createCalendar = (input: string) => {
    const date = dayjs(input);
    const firstDay = firstDayOfMonth(date.startOf('month').day());
    const countDays = date.daysInMonth();
    const monthAndYear = date.format('MM-YYYY');

    let current = date.subtract(firstDay + 1, 'day');
    
    const lastDay = current.add(Math.ceil((firstDay + countDays) / 7) * 7, 'day')
    const calendar: ICalendarObject[][] = [];

    while(current < lastDay) {
        const group: ICalendarObject[] = [];

        for(let i = 0; i < 7; i++) {
            group.push({
                date: current.format('YYYY-MM-DD'),
                day: current.get('date'),
                isToday: current.isToday(),
                isCurrentMonthAndYear: current.format('MM-YYYY') === monthAndYear
            });

            current = current.add(1, 'day');
        }

        calendar.push(group);
    }

    return calendar;
};
