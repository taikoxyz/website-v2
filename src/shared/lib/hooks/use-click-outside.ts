import { useEffect, useRef } from 'react';

export const useClickOutside = function<T extends HTMLDivElement>(handler: Function) {
    const ref = useRef<T>(null);

    const onClickOutside = (ev: MouseEvent) => {
        if (!ref.current) return;
        if (ev.button === 2) return;
        if (ev.composedPath().includes(ref.current)) return;
        handler();
    };

    useEffect(() => {
        window.addEventListener('mousedown', onClickOutside);
        return () => window.removeEventListener('mousedown', onClickOutside);
    });

    return ref;
};
