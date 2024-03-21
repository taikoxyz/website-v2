import { AppContext } from './context';
import { useContext } from "react"

export const useApp = () => {
    const context = useContext(AppContext);
    return context;
}