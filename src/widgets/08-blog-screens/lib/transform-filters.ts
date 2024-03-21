import dayjs from "dayjs";
import { IBlogCategory } from "shared/lib/types";

export interface IBlogDateDefault {
    title: string;
    value: string;
}

export interface IBlogDate {
    title: string;
    key: string;
    value: {
        from?: string;
        to?: string;
    }
}

export const transformDate = (initialData: IBlogDateDefault[]) => {
    const data: IBlogDate[] = [];

    for(let item of initialData) {
        const date: IBlogDate = {
            title: item.title,
            key: item.value,
            value: {}
        };

        if(item.value === 'all') {
            date.value.from = date.value.to = undefined;
        }

        if(item.value === 'a-month') {
            date.value.from = dayjs().subtract(1, 'month').toISOString();
        }

        if(item.value === '6-month') {
            date.value.from = dayjs().subtract(6, 'month').toISOString();
        }

        if(item.value === 'year') {
            date.value.from = dayjs().subtract(1, 'year').toISOString()
        }

        data.push(date);
    }

    return data;
}

export const transformCategory = (initialData: IBlogCategory[]) => {
    const data = [{ name: "All topics", value: "all" }];

    for(let item of initialData) {
        data.push({
            name: item.name,
            value: item.id.toString()
        });
    }

    return data;
}