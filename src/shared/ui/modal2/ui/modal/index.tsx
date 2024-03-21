import clsx from 'clsx';
import React, { useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useModal, useModalActive } from '../../lib/providers';
import { ModalContext } from '../../lib/providers/context';
import css from './modal.module.scss';

type DivProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = {
    name: string;
    animation?: {
        enter: string;
        enterActive: string;
        exit: string;
        exitActive: string;
    };
    timeout?: number;
    children?: React.ReactNode;
    className?: string;
} & DivProps;

export const Modal: React.FC<Props> = ({
    name,
    animation = css,
    timeout = 350,
    className,
    children,
    ...props
}) => {
    const { closeModal, getModal, addToList, removeFromList } = useContext(ModalContext);

    const onClick = (ev: React.MouseEvent<HTMLDivElement>) => {
        if(props.onClick) {
            props.onClick(ev);
        }

        if(!ev.defaultPrevented && ev.button !== 2 && ev.target === ev.currentTarget) {
            closeModal(name);
        }
    }

    useEffect(() => {
        addToList(name);
        return () => removeFromList(name);
    }, []);

    return ( 
        <CSSTransition
            in={getModal(name)?.active}
            classNames={animation}
            timeout={timeout}
            mountOnEnter
            unmountOnExit
        >
            <div 
                {...props} 
                onClick={onClick}
                className={clsx(css.modal, className)}
            >
                {children}
            </div>
        </CSSTransition>
    );
}