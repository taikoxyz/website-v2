import React from "react";
import css from "./calendar-day.module.scss";
import clsx from "clsx";

interface Props {
    date: string;
    day: number;
    isToday: boolean;
    isCurrentYearAndMonth: boolean;
    inRange?: boolean;
    isStartRange?: boolean;
    isEndRange?: boolean;
    onClick?: () => void;
}

export const CalendarDay: React.FC<Props> = ({
    date,
    day,
    isCurrentYearAndMonth,
    isToday,
    inRange,
    isEndRange,
    isStartRange,
    onClick,
}) => {
    return (
        <div 
            className={clsx(
                `calendar-day`,
                css.day,
                isToday && [`calendar-day-today`, css.dayToday],
                !isCurrentYearAndMonth && ['calendar-day-other-month', css.dayOtherMonth],
                inRange && ['calendar-day-in-range', css.dayInRange],
                isStartRange && ['calendar-day-start-range', css.dayStartRange],
                isEndRange && ['calendar-day-end-range', css.dayEndRange],
            )}
            onClick={onClick}
        >
            <div className={css.day_inner}>
                <span>{day}</span>
            </div>
        </div>
    );
};