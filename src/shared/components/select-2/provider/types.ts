import { RefObject } from "react";

export interface ISelectContextValue {
    active: boolean;
    inputValue: string;
}

export interface ISelectContextRefs {
    valueContainer: RefObject<HTMLDivElement>;
}

export type ISelectContextValueOptional = { 
    [K in keyof ISelectContextValue]?: ISelectContextValue[K];
}

export interface ISelectContextType {
    state: ISelectContextValue;
    refs: ISelectContextRefs;
    setState: (state: ISelectContextValueOptional) => void;
}