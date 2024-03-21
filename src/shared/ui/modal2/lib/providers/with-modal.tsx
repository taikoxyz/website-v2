import React, { useEffect, useRef } from 'react';
import { AppProps } from 'next/app';
import { ModalContext } from './context';
import { useModalInitial } from './state';

interface Props {
    children: React.ReactNode;
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
    const value = useModalInitial();
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            const isActive = value.modals.some((modal) => modal.active);
    
            document.documentElement.style.overflow 
                = isActive ? "hidden" : "";
        }
        rendered.current = true;
    }, [value]);

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

export const withModal = (component: (props: AppProps) => JSX.Element) => {
    return (props: AppProps) => (
        <ModalProvider>
            {component(props)}
        </ModalProvider>
    )
};

