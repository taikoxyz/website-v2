import { IBlog, IBlogsResponse } from 'shared/lib/types/blog';

export const flatBlogs = (data: IBlogsResponse[]) => {
    return data.reduce(
        (acc, item) => [...acc, ...item.results],
        [] as IBlog[]
    );
}