import queryString from 'qs';
import { getCoreConfig } from 'shared/lib/config';

export const getProjectsQuery = (
    query: Record<string, any>, 
    userQuery?: Record<string, any>
) => {
    return queryString.stringify({
        search: userQuery?.search || undefined,
        category: userQuery?.category || undefined,
        type: userQuery?.type || undefined,
        page: userQuery?.page || query.page || 1,
        _limit: getCoreConfig().projectsPerPage
    });
}