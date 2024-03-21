import { ObjectStateOutput } from "shared/lib/hooks/use-object-state";

export interface IAppContextValues {
    menuActive: boolean;
}

export type IAppContext = ObjectStateOutput<IAppContextValues>;