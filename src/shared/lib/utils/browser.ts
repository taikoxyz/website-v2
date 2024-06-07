export function css<T extends HTMLElement>(element: T, styles: Partial<CSSStyleDeclaration>) {
    Object.assign(element.style, styles);
}

export const executeOnReadyPage = (fn: Function) => {
    if (document.readyState === 'complete') fn();
    else window.addEventListener('load', () => fn());
};
