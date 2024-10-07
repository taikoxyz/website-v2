import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useSearchParamsSetter = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const pushSearchParams = useCallback(
        (params: URLSearchParams | ((current: URLSearchParams) => URLSearchParams | null),
        ) => {
            let next: URLSearchParams | null;
            const current = new URLSearchParams(searchParams || undefined);
            if (typeof params === 'function') {
                next = params(current);
            } else {
                next = params;
            }
            if (!next) {
                return;
            }
            const nextUrl = pathname + "?" + next.toString();
            router.push(nextUrl, { scroll: false });
            return { nextUrl, next };
        }, [searchParams, pathname]);

    const pushSearchParamsKeyValue = useCallback((key: string, value: ParamValue, { deleteKeys }: CallbackOptions = {}) => {
        return pushSearchParams((current) => {
            switch (typeof deleteKeys) {
                case 'string':
                    if (deleteKeys === 'all') {
                        current = new URLSearchParams();
                    }
                    break;
                case 'object':
                    if (Array.isArray(deleteKeys)) {
                        for (const deleteKey of deleteKeys) {
                            current.delete(deleteKey);
                        }
                    }
                    break;
            }
            return setParam(current, key, value);
        });
    }, [pushSearchParams]);

    return { pushSearchParams, pushSearchParamsKeyValue, searchParams: searchParams };
};

const setParam = (params: URLSearchParams, key: string, value: ParamValue, append = false) => {
    if (value === null || value === '') {
        params.delete(key);
        return params;
    }
    // Normalize the tags parameter to lowercase
    if (key === 'tags' && typeof value === 'string') {
        value = value.toLowerCase();
    }
    switch (typeof value) {
        case 'object':
            if (Array.isArray(value)) {
                params.delete(key);
                for (const vv of value) {
                    params = setParam(params, key, vv, true);
                }
                return params;
            }
            break;
    }
    if (append) {
        params.append(key, _serializeParam(value));
    } else {
        params.set(key, _serializeParam(value));
    }
    return params;
};

type ParamValue = SerializableParamValue | SerializableParamValue[] | null;
type SerializableParamValue = string | number | boolean;
const _serializeParam = (value: SerializableParamValue): string => {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
            return value.toString();
        case 'boolean':
            return value ? 'y' : 'n';
    }
};

const serializeParam = (value: SerializableParamValue | Array<SerializableParamValue>): string | string[] => {
    if (Array.isArray(value)) {
        return value.map(s => _serializeParam(s));
    }
    return _serializeParam(value);
};

type CallbackOptions = {
    deleteKeys?: 'all' | string[]
};

export default useSearchParamsSetter;