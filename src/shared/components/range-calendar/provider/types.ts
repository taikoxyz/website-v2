import { RangeCalendarValue } from "../lib/types";

export type Optional<T extends object> = {
    [K in keyof T]?: T[K];
}

export interface ICalendarState {
    currentDate: string;
    value: RangeCalendarValue;
}

export interface ICalendarContext {
    state: ICalendarState;
    setState: (value: ICalendarState) => void;
}