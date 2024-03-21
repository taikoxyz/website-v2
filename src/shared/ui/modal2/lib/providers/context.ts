import { createContext } from "react";
import { IModalContext } from "../types";

export const ModalContext = createContext<IModalContext>({
    modals: [],
    openModal: () => {},
    toggleModal: () => {},
    getModal: () => null,
    addToList: () => {},
    removeFromList: () => {},
    closeModal: () => {},  
    closeAllModals: () => {}
});