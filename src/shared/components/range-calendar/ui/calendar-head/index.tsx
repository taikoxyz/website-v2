import React, { useMemo } from "react";
import { useCalendarActions, useCalendarState } from "../../provider";
import dayjs from "dayjs";
import css from "./calendar-head.module.scss";

import arrowSvg from '../../assets/arrow-left.svg';

interface Props {

}

export const CalendarHead: React.FC<Props> = (props) => {
    const { currentDate } = useCalendarState();
    const { changeDate } = useCalendarActions();

    const date = useMemo(
        () => dayjs(currentDate),
        [currentDate]
    );

    const handlePrev = () => {
        changeDate(
            date.subtract(1, 'month').format('YYYY-MM-DD')
        );
    }

    const handleNext = () => {
        changeDate(
            date.add(1, 'month').format('YYYY-MM-DD')
        );
    }

    return (
        <div className={css.header}>
            <button 
                className={`${css.arrow} ${css.arrowPrev}`}
                onClick={handlePrev}
            >
                <img src={arrowSvg.src} alt="" />
            </button>

            <div className={css.month}>
                <button className={css.monthBtn}>
                    {date.format('MMM')}{' '}
                    {date.format('YYYY')}
                </button>
            </div>
            
            <button 
                className={`${css.arrow} ${css.arrowNext}`}
                onClick={handleNext}
            >
                <img src={arrowSvg.src} alt="" />
            </button>
        </div>
    );
};