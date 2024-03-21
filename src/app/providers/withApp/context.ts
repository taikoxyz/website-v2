import { createAppState } from './state';
import { createContext } from "react";
import { IAppContext } from "./types";

export const AppContext = createContext<IAppContext>([
    createAppState(),
    () => {},
    {
        resetState: () => {},
        setStateValue: () => {}
    }
])