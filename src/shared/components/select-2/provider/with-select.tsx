import { SelectContext, useSelectInitial } from "./context"

export const WithSelect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useSelectInitial();

    return (
        <SelectContext.Provider value={context}>
            {children}
        </SelectContext.Provider>
    )
}