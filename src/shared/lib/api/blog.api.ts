import { IBlog, IBlogsNear, IBlogsResponse } from "../types";
import { instance } from "../utils/instance";

export const blogApi = {
    async getAll(query?: string) {
        const { data } = await instance.get<IBlogsResponse>('/blogs' + (query ? `?${query}` : ''));
        return data;
    },

    async getOne(slogOrId: string) {
        const { data } = await instance.get<IBlog>(`/blogs/${slogOrId}`);
        return data;
    },

    async near(id: number) {
        const { data } = await instance.get<IBlogsNear>(`/blogs/${id}/near`);
        return data;
    }
};