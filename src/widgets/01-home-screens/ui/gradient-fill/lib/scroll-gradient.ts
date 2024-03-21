export const scrollGradient = (
    element: HTMLElement,
    blockElement: HTMLElement,
    color: string
) => {
    const run = () => {
        const elCoords = element.getBoundingClientRect();
        const elLeft = elCoords.left + window.pageXOffset;
        const elTop = elCoords.top + window.pageYOffset;
    
        const destCoords = blockElement.getBoundingClientRect();
        const destLeft = destCoords.left + window.pageXOffset;
        const destTop = destCoords.top + window.pageYOffset;

        const top = (destTop + destCoords.height / 2) - (elTop + elCoords.height / 2);
        const left = (destLeft + destCoords.width / 2) - (elLeft + elCoords.width / 2);

        element.style.transform = `translate(${left}px, ${top}px)`;
        element.style.opacity = '0';
        blockElement.style.background = color;

        const icon = blockElement.querySelector('[data-icon]') as HTMLElement;
        
        if(icon) {
            icon.style.background = color;
        }
    }

    const destroy = () => {
        element.style.transform = "";
        blockElement.style.background = "";
    }

    return {
        run, 
        destroy
    };
}