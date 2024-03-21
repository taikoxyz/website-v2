import React from "react";
import { ISelectDefaultItem, ISelectProps } from "../../types";
import css from "./select-label.module.scss";
import clsx from "clsx";

export const SelectLabel = <T extends ISelectDefaultItem | object>({
    label,
    classNames
}: ISelectProps<T>) => {
    if(!label) return null;

    return (
        <p 
            className={clsx(
                css.label,
                classNames?.label || css.default
            )}
            data-select="label"
        >
            <span>{label}</span>
        </p>
    );
};