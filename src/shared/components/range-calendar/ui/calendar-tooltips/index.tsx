import React from "react";
import css from "./calendar-tooltips.module.scss";
import { Button } from "shared/components/@buttons/button";
import { RangeCalendarProps } from "../../lib/types";
import { useCalendarState } from "../../provider";

type Props = Omit<RangeCalendarProps, 'value' | 'onChange'>;

export const CalendarTooltips: React.FC<Props> = ({
    onApply,
    onCancel,
}) => {
    const { value: [from, to] } = useCalendarState();
    
    const handleApply = () => {
        if(from && to) {
            onApply?.([from, to] as [string, string]);
        }
    }

    return (
        <div className={css.controls}>
            <button 
                className={css.cancel} 
                onClick={onCancel}
            >
                Cancel
            </button>
            <Button 
                onClick={handleApply}
                text="Apply"
            />
        </div>
    );
};