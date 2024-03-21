import { useMemo, useRef, useEffect } from 'react';

interface Props {
    offset?: number | string;
    handler?: (progress: number) => void;
}

const defaultProps = {
    offset: 0,
    handler: () => {}
}

export const useScrollProgress = (props: Props = {}) => {
    const ref = useRef<any>(null);
    
    const options = useMemo(() => Object.assign({ ...defaultProps }, props), [props]);

    const getOffset = () => {
        if(typeof props.offset === 'string' && props.offset.includes('%')) {
            const percent = parseFloat(props.offset) / 100;
            return window.innerHeight * percent;
        } 
        if(typeof props.offset === 'number') {
            return props.offset;
        }
        return 0;
    }

    const scroll = () => {
        const el = ref.current as HTMLElement | null;
        if(!el) return;
        const offset = getOffset();
        const { top, height } = el.getBoundingClientRect();
        const scrollBottom = window.pageYOffset + (window.innerHeight - offset);
        const elTop = (window.pageYOffset || document.documentElement.offsetTop) + top;
        // const elHeight = height - options.offset;

        let progress = (scrollBottom - elTop) / height;
        if(progress < 0) progress = 0;
        if(progress > 1) progress = 1;
        
        options.handler(progress);
    }

    useEffect(() => {
        window.addEventListener("scroll", scroll);
        return () => window.removeEventListener("scroll", scroll);
    });

    useEffect(() => {
        scroll();
    }, []);

    return ref;
}