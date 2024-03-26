export interface IModalObject<T = unknown> {
    name: string;
    active: boolean;
    payload?: T;
}

export interface IModalContext {
    modals: IModalObject[];
    addToList: (name: string) => void;
    removeFromList: (name: string) => void;
    getModal: <T = unknown>(name: string) => IModalObject<T> | null;
    openModal: <T = unknown>(name: string, payload?: T) => void;
    toggleModal: <T = unknown>(name: string, payload?: T) => void;
    closeModal: (name: string) => void;
    closeAllModals: () => void;
}