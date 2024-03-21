import { ReactNode } from 'react';

export interface InputClasses {
    root?: string;
    field?: string;
    input?: string;
    title?: string;
    error?: string;
    placeholder?: string;
}

export interface InputBaseProps {
    className?: string | InputClasses;
    title?: string;
    error?: string | null | false;
    icon?: ReactNode;
    controls?: ReactNode;
    variant?: "default" | "float";
}

export interface TextAreaComponentProps extends InputBaseProps {
    component?: 'textarea';
    autoHeight?: boolean;
}

export interface InputComponentProps extends InputBaseProps {
    component?: 'input';
}

export type InputAttributes = 
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> &
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

export type InputProps = InputAttributes & (TextAreaComponentProps | InputComponentProps);