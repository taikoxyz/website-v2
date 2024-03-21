interface Props {
    activeClass?: string;
    triggerClass?: string | HTMLElement;
    defaultClass?: string;
    triggerOnce?: boolean;
    offset?: number | string;
    onUpdate?: (thisObj: ThisProps, active?: boolean) => void;
}

interface ThisProps {
    destroy: () => void;
}

type StrongProps = {
    [P in keyof Props]-?: Props[P];
};

const getDefaultProps = (): StrongProps => ({
    triggerClass: 'animation',
    defaultClass: '',
    activeClass: 'active',
    triggerOnce: true,
    offset: '0',
    onUpdate: () => {},
});

export const animateOnScroll = (props: Props = {}) => {
    const elements: HTMLElement[] = [];
    const params = Object.assign(getDefaultProps(), props);

    const $this = {
        destroy() {
            window.removeEventListener('scroll', scroll);

            if (params.defaultClass) {
                elements.forEach((el) => el.classList.remove(params.defaultClass));
            }
        },
    };

    const getOffset = (offset: string | number) => {
        const bps = offset.toString().split('|');

        let ofs = bps[0];

        if (window.innerWidth <= 465 && bps[2]) {
            ofs = bps[2];
        } else if (window.innerWidth <= 768 && bps[1]) {
            ofs = bps[1];
        }

        if (ofs.includes('%')) {
            return window.innerHeight * (parseFloat(ofs) / 100);
        }

        return parseFloat(offset.toString()) || 0;
    };

    const scroll = () => {
        for (let element of elements) {
            const coords = element.getBoundingClientRect();
            const elementTop = coords.top + window.pageYOffset;
            const scrollBottom = window.pageYOffset + window.innerHeight;
            const offset = getOffset(element.dataset.aosOffset || params.offset.toString());

            if (elementTop <= scrollBottom - offset) {
                element.classList.add(params.activeClass);
                params.onUpdate($this, true);
            }
        }
    };

    const init = () => {
        const els = Array.from(
            typeof params.triggerClass === 'string'
                ? document.querySelectorAll(`.${params.triggerClass}`)
                : [params.triggerClass]
        ) as HTMLElement[];
        
        elements.push(...els);

        if (params.defaultClass) {
            elements.forEach((el) => el.classList.add(params.defaultClass));
        }

        scroll();

        window.addEventListener('scroll', scroll);
    };

    setTimeout(() => init(), 300);

    return $this;
};
