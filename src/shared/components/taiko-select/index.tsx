import React, { useMemo } from 'react';
import { Select, SelectItem } from 'shared/ui/select';
import css from './taiko-select.module.scss';

type IVariants = "sort" | "select";

interface Props<T extends SelectItem> {
    value: T | null;
    onChange: (data: T | null) => void;
    options: T[];
    text?: string;
    variant?: IVariants;
}

export const TaikoSelect = <T extends SelectItem>({
    text,
    value,
    options,
    onChange,
    variant = "sort"
}: Props<T>) => {

    const styles = useMemo(
        () => {
            const vars: Record<IVariants, Record<string, string>> = {
                select: {
                    root: `${css.select} taiko-select`,
                    list: css.select_list,
                    listItem: css.select_listItem,
                    listItemActive: css.select_listItemActive,
                    defaultText: css.select_text,
                    valueContainer: css.select_valueContainer,
                    value: css.select_value
                },
                sort: {
                    root: css.sort,
                    list: css.sort_list,
                    listItem: css.sort_listItem,
                    defaultText: css.sort_text,
                    valueContainer: css.sort_valueContainer,
                    value: css.sort_value
                }
            };

            return vars[variant];
        }, 
        [variant]
    );

    return (
        <Select 
            classNames={styles}
            value={value}
            onChange={onChange}
            options={options}
            defaultText={text}
            disableInput
        />
    );
}