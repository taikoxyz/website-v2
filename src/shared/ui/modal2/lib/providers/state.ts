import { useState } from 'react';
import { IModalContext, IModalObject } from './../types';

export const useModalInitial = (): IModalContext => {
    const [modals, setModals] = useState<IModalObject[]>([]);

    const getModal = <T = undefined>(name: string) => {
        const modal = modals.find((modal) => modal.name === name);
        if (!modal) return null;
        return {
            ...modal,
            payload: modal.payload as T,
        };
    };

    const addToList = (name: string) => {
        if (!getModal(name)) {
            setModals((modals) =>
                modals.concat({
                    name,
                    active: false,
                    payload: null,
                })
            );
        }
    };

    const removeFromList = (name: string) => {
        setModals((modals) => modals.filter((modal) => modal.name !== name));
    };

    const openModal = <T = unknown>(name: string, payload?: T) => {
        setModals((modals) =>
            modals.map((modal) =>
                modal.name === name ? { ...modal, payload, active: true } : modal
            )
        );
    };

    const closeModal = (name: string) => {
        setModals((modals) =>
            modals.map((modal) => (modal.name === name ? { ...modal, active: false } : modal))
        );
    };

    const toggleModal = <T = unknown>(name: string, payload?: T) => {
        if (!getModal(name)) {
            openModal<T>(name, payload);
        } else {
            closeModal(name);
        }
    };

    const closeAllModals = () => {
        setModals((modals) => modals.map((modal) => ({ ...modal, active: false })));
    };

    return {
        modals,
        addToList,
        removeFromList,
        getModal,
        openModal,
        closeModal,
        toggleModal,
        closeAllModals,
    };
};
