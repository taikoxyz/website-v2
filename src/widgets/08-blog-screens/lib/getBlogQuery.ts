import queryString from 'qs';
import { getCoreConfig } from 'shared/lib/config';
import { IBlogFilter } from '../provider/types';

export const getBlogQuery = (
    query: Record<string,any>, 
    page?: number,
    extraParams?: IBlogFilter
) => {
    const from = extraParams?.dateRange.value.from;
    const to = extraParams?.dateRange.value.to;

    console.log(queryString.stringify({
        page: page || query.page || 1,
        _limit: getCoreConfig().postsPerPage,
        categoryId: extraParams?.topic.value === 'all' 
            ? undefined
            : extraParams?.topic.value,
        'date[from]': from ? from.split('T')[0] : undefined,
        'date[to]': to ? to.split('T')[0] : undefined
    }))

    return queryString.stringify({
        page: page || query.page || 1,
        _limit: getCoreConfig().postsPerPage,
        categoryId: extraParams?.topic.value === 'all' 
            ? undefined
            : extraParams?.topic.value,
        'date[from]': from ? from.split('T')[0] : undefined,
        'date[to]': to ? to.split('T')[0] : undefined
    });
}