import { useRef } from 'react';
import { useObjectState } from './use-object-state';

interface useInputProps {
    defaultValue?: string;
    unblockTimeout?: number;
}

export const useInput = (props?: useInputProps) => {
    const [state, _, { setStateValue }] = useObjectState({
        value: props?.defaultValue ?? '',
        isTyping: false,
    });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleValue = (value: string) => {
        setStateValue('value', value);

        if (props?.unblockTimeout) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setStateValue('isTyping', true);
            timeoutRef.current = setTimeout(() => {
                setStateValue('isTyping', false);
                clearTimeout(timeoutRef.current!);
            }, props.unblockTimeout);
        }
    };

    return {
        ...state,
        handleValue,
        clearValue: state.value.trim(),
    };
};
