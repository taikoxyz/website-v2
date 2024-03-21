import React, { useMemo } from "react";
import { Week, createCalendar } from "../../lib";
import { useCalendarActions, useCalendarState } from "../../provider";
import { CalendarDay } from "../calendar-day";
import dayjs from "dayjs";
import css from "./calendar-body.module.scss";
import { RangeCalendarInput, RangeCalendarProps, RangeCalendarValue } from "../../lib/types";

type Props = Omit<RangeCalendarProps, 'value' | 'onApply' | 'onCancel'>;

export const CalendarBody: React.FC<Props> = ({
    onChange
}) => {
    const { currentDate, value: [fromDate, toDate] } = useCalendarState();
    const { changeValue } = useCalendarActions();

    console.log([fromDate, toDate])

    const calendar = useMemo(
        () => createCalendar(currentDate),
        [currentDate]
    );

    const range = useMemo(
        () => ({
            from: fromDate ? dayjs(fromDate) : null,
            to: toDate ? dayjs(toDate) : null
        }),
        [fromDate, toDate]
    );

    const handleClickDay = (date: string) => {
        const day = dayjs(date);
        const dayFormat = day.format('YYYY-MM-DD');

        let val: RangeCalendarValue;

        if(fromDate && !toDate && dayFormat !== fromDate && dayjs(fromDate) < day) {
            val = [fromDate, dayFormat];
        } else {
            val = [dayFormat, null];
        }

        onChange?.(val);
        changeValue(val);
    }

    const checkInRange = (date: string) => {
        if(!range.from || !range.to) return false;
        
        const day = dayjs(date);

        return day <= range.to && day >= range.from;
    }

    const checkStartRange = (date: string) => {
        if(!range.from) return false;

        return range.from.format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD');
    }

    const checkEndRange = (date: string) => {
        if(!range.to) return false;

        return range.to.format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD');
    }

    return (
        <div className={`calendar-body ${css.body}`}>
            <ul className={`calendar-row calendar-row-title ${css.row} ${css.rowTitle}`}>
                {Week.map((item) => (
                    <li 
                        className={`calendar-row-item calendar-row-item-title ${css.row_item} ${css.row_itemTitle}`}
                        key={item}
                    >
                        <span>{item[0]}</span>
                    </li>
                ))}
            </ul>
            {calendar.map((week, id) => (
                <ul 
                    className={`calendar-row ${css.row}`}
                    key={id}
                >
                    {week.map((day) => (
                        <li 
                            className={`calendar-row-item ${css.row_item}`}
                            key={day.date}
                        >
                            <CalendarDay 
                                date={day.date}
                                day={day.day}
                                isToday={day.isToday}
                                isCurrentYearAndMonth={day.isCurrentMonthAndYear}
                                inRange={checkInRange(day.date)}
                                isStartRange={checkStartRange(day.date)}
                                isEndRange={checkEndRange(day.date)}
                                onClick={handleClickDay.bind(null, day.date)}
                            />
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
};