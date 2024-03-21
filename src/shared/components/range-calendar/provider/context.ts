import dayjs from 'dayjs';
import { ICalendarContext, ICalendarState, Optional } from './types';
import { createContext, useContext } from 'react';
import { RangeCalendarValue } from '../lib/types';

export const createCalendarState = (value?: RangeCalendarValue): ICalendarState => ({
    currentDate: dayjs().format('YYYY-MM-DD'),
    value: value || [null, null]
});

export const CalendarContext = createContext<ICalendarContext>({
    state: createCalendarState(),
    setState: () => {},
});

export const useCalendarState = () => useContext(CalendarContext).state;

export const useCalendarActions = () => {
    const { state, setState: setStateDefault } = useContext(CalendarContext);

    const setState = (values: Optional<ICalendarState>) => setStateDefault({ ...state, ...values })

    const resetState = () => setStateDefault(createCalendarState());

    const changeDate = (currentDate: typeof state.currentDate) => setState({ currentDate }); 

    const changeValue = (value: RangeCalendarValue) => setState({ value });

    return {
        setState,
        resetState,
        changeDate,
        changeValue
    };
}