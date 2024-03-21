export function getTextWidthMax(text: string[], elStyle: HTMLElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return 0;

    context.font = window.getComputedStyle(elStyle).getPropertyValue('font');

    let maxWidth = 0;

    for (let item of text) {
        let width = context.measureText(item).width;
        if (width > maxWidth) {
            maxWidth = width;
        }
    }

    canvas.remove();

    return maxWidth;
}
