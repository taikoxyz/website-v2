import { createContext, useContext, useState } from 'react';
import { IBlogFilter, IBlogFilterContext } from './types';
import { Optional } from 'shared/lib/utils/typescript';
import { useTranslationObject } from 'shared/lib/hooks/use-translation-object';
import { IBlogDate, IBlogDateDefault, transformCategory, transformDate } from '../lib/transform-filters';

export const createBlogFilter = (
    dateRange: IBlogDate = {
        title: 'All time',
        value: {},
        key: 'all'
    }
): IBlogFilter => ({
    dateRange,
    topic: transformCategory([])[0],
});

export const BlogFilterContext = createContext<IBlogFilterContext>({
    state: createBlogFilter(),
    setState: () => {},
});

const useBlogFilterInitial = (dateRange?: IBlogDate) => {
    const [state, setStateDefault] = useState<IBlogFilter>(createBlogFilter(dateRange));

    const setState = (values: Optional<IBlogFilter>) => {
        setStateDefault({ ...state, ...values });
    };

    return { state, setState };
};

export const useBlogFilter = () => useContext(BlogFilterContext);

export const WithBlogFilter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const date = useTranslationObject<IBlogDateDefault[]>('date', 'blog');
    const context = useBlogFilterInitial(transformDate(date)[0]);

    return <BlogFilterContext.Provider value={context}>{children}</BlogFilterContext.Provider>;
};
