import dayjs from "dayjs";

export type RangeCalendarInput = string | number | Date | dayjs.Dayjs | null | undefined;
export type RangeCalendarValue = [RangeCalendarInput, RangeCalendarInput];

export interface RangeCalendarProps {
    value?: RangeCalendarValue;
    onChange?: (value: RangeCalendarValue) => void;
    onApply?: (value: [string, string]) => void;
    onCancel?: () => void;
}