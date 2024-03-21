import { createContext, useContext, useRef, useState } from 'react';
import { ISelectContextType, ISelectContextValue, ISelectContextValueOptional } from './types';

export const SelectContext = createContext<ISelectContextType>({
    state: {
        inputValue: '',
        active: false,
    },
    refs: {
        valueContainer: { current: null },
    },
    setState: () => {},
});

export const useSelectInitial = () => {
    const [state, setStateValues] = useState<ISelectContextValue>({
        inputValue: '',
        active: false,
    });

    const setState = (values: ISelectContextValueOptional) => {
        setStateValues({ ...state, ...values });
    };

    return {
        state,
        setState,
        refs: {
            valueContainer: useRef<HTMLDivElement>(null),
        },
    };
};

export const useSelect = () => {
    return useContext(SelectContext);
} 