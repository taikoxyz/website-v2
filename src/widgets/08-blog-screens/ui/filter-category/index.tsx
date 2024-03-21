import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useBlogFilter } from "widgets/08-blog-screens/provider";
import { useTranslation } from "next-i18next";
import { BlogFilter } from "../blog-filter";
import { IBlogCategory } from "shared/lib/types";
import { blogCategoryApi } from "shared/lib/api";
import { transformCategory } from "widgets/08-blog-screens/lib/transform-filters";
import { SelectItem } from "shared/ui/select";
import css from "./filter-category.module.scss";

export const FilterCategory: React.FC = () => {
    const [active, setActive] = useState(false);
    const { state, setState } = useBlogFilter();
    const [data, setData] = useState<IBlogCategory[]>([]);
    const { t } = useTranslation();

    const onChange = (topic: SelectItem) => {
        setState({ topic });
        setActive(false);
    }

    useEffect(() => {
        blogCategoryApi
            .getAll()
            .then((data) => setData(data.results));
    }, []);

    const categories = useMemo(
        () => transformCategory(data),
        [data]
    );
    
    return (
        <div className={css.root}>
            <BlogFilter
                active={active}
                setActive={setActive}
                title={t('topic')}
                placeholder={state.topic.name.toString()}
                children={
                    <div className={css.content}>
                        {categories.map((item) => (
                            <div
                                className={clsx(
                                    css.item,
                                    state.topic.value === item.value && css.itemActive
                                )}
                                onClick={() => onChange(item)}
                                key={item.value}
                            >
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                }
            />
        </div>
    );
};