interface Props {
    offset?: string | number;
    onScroll?: (progress: number) => void;
}

type StrictProps = {
    [K in keyof Props]-?: Props[K]; 
}

export const stickyScroll = (
    stickyEl: HTMLElement, 
    props: Props = {}
) => {
    let iw = 0;

    const options = Object.assign(
        {
            offset: 0,
            onScroll: () => {}
        } as StrictProps, 
        props
    );

    const getOffset = () => {
        if(typeof options.offset === 'number') {
            return options.offset;
        }

        else if(typeof options.offset === 'string') {
            if(options.offset.includes('%')) {
                return (parseFloat(options.offset) / 100) * window.innerHeight;
            }
        }
        
        return 0;
    }

    const scroll = () => {
        const boxEl = stickyEl.parentElement;

        if(!boxEl) return;

        const scrollHeight = boxEl.scrollHeight;

        const boxStartPx = boxEl.getBoundingClientRect().top + window.pageYOffset;
        const contentPx = stickyEl.getBoundingClientRect().top + window.pageYOffset;

        const offset = getOffset();

        const scrollHeightWithoutContentPx = scrollHeight - (stickyEl.offsetHeight + offset);

        let progress = 1 - (Math.floor((boxStartPx + scrollHeightWithoutContentPx) - contentPx) / scrollHeightWithoutContentPx);

        if(progress < 0) progress = 0;

        if(progress > 1) progress = 1;

        options.onScroll(progress);
    }
    
    const resize = () => {
        if(iw !== window.innerWidth) {
            iw = window.innerWidth;
            scroll();
        }
    }
    
    const init = () => {
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', scroll);
        resize();
    }

    init();

    return {
        destroy: () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', scroll);
        }
    }
}