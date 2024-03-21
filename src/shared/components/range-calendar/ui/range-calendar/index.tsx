import React from "react";
import { RangeCalendarProps } from "../../lib/types";
import { WithCalendar } from "../../provider";
import { CalendarHead } from "../calendar-head";
import { CalendarBody } from "../calendar-body";
import css from "./range-calendar.module.scss";
import { CalendarTooltips } from "../calendar-tooltips";

export const RangeCalendar: React.FC<RangeCalendarProps> = ({
    onApply,
    onChange,
    onCancel,
    value,
}) => {
    return (
        <WithCalendar value={value}>
            <div className={css.calendar}>
                <CalendarHead />
                <CalendarBody onChange={onChange} />
                <CalendarTooltips onApply={onApply} onCancel={onCancel} />
            </div>
        </WithCalendar>
    );
};