import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useSearchParamsSetter from "shared/lib/hooks/use-search-params-setter";

export interface IEcosystemFilters {
    search: string;
    type: string | null;
    category: string | null;
}

export interface IEcosystemContext {
    filters: IEcosystemFilters;
    setFilter: <T extends keyof IEcosystemFilters>(
        key: T,
        value: IEcosystemFilters[T]
    ) => void;
}

interface Props {
    children: React.ReactNode;
}

export const EcosystemContext = createContext<IEcosystemContext>({
    filters: {
        search: "",
        type: null,
        category: null
    },
    setFilter: () => { }
});

export const useEcosystemFilters = () => {
    return useContext(EcosystemContext);
}

export const EcosystemFilters: React.FC<Props> = ({ children }) => {
    const { searchParams, pushSearchParamsKeyValue } = useSearchParamsSetter()
    const [state, setState] = useState<IEcosystemFilters>({
        search: searchParams?.get('search') || '',
        category: searchParams?.get('tags') || null,
        type: searchParams?.get('type') || 'Mainnet' // Set the initial type to 'Mainnet'
    });

    const setFilter = <T extends keyof IEcosystemFilters>(
        key: T,
        value: IEcosystemFilters[T]
    ) => {
        switch (key) {
            case 'category':
                pushSearchParamsKeyValue('tags', value)
                break
            case 'type':
                pushSearchParamsKeyValue('type', value)
                break
            case 'search':
                pushSearchParamsKeyValue('search', value)
                break
        }
        setState({ ...state, [key]: value });
    }

    return (
        <EcosystemContext.Provider value={{ filters: state, setFilter }}>
            {children}
        </EcosystemContext.Provider>
    )
}