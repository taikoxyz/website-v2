import { createContext, useContext, useState } from "react";

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
    setFilter: () => {}
});

export const useEcosystemFilters = () => {
    return useContext(EcosystemContext);
}

export const EcosystemFilters: React.FC<Props> = ({ children }) => {
    const [state, setState] = useState<IEcosystemFilters>({
        search: '',
        category: null,
        type: null
    });

    const setFilter = <T extends keyof IEcosystemFilters>(
        key: T, 
        value: IEcosystemFilters[T]
    ) => {
        setState({  ...state, [key]: value });
    }
    
    return (
        <EcosystemContext.Provider value={{ filters: state, setFilter }}>
            {children}
        </EcosystemContext.Provider>
    )
}