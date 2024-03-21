interface CallbackType {
    src: string;
    cb?: Function;
    timeout?: number;
    priority?: number;
}

const loadImage = (src: string, successCb: Function, errCb?: Function) => {
    const img = document.createElement('img');
    img.src = src;

    img.onload = () => successCb();
    img.onerror = () => errCb && errCb();

    img.remove();
};

const loadVideo = (src: string, successCb: Function, errCb?: Function) => {
    const video = document.createElement('video');

    video.oncanplaythrough = () => successCb();

    video.src = src;
    video.load();

    video.remove();
};

const Loader = () => {
    const callbacks: CallbackType[] = [];
    let inWork = false;

    const next = () => {
        callbacks.sort((a, b) => (a.priority || 1) - (b.priority || 1));
        const current = callbacks.shift();
        if (!current) return;

        inWork = true;

        const { timeout, cb, src } = current;

        let done = false;

        const callback = () => {
            if (!done) {
                cb && cb();
                inWork = false;
                done = true;
                next();
            }
        };

        timeout && setTimeout(callback, timeout);

        if (/\.(webp|jpe?g|png)$/g.test(src)) loadImage(src, callback, callback);

        if (/\.(mp4|avi|webm)$/g.test(src)) loadVideo(src, callback, callback);
    };

    return {
        push(src: string, cb?: Function, timeout?: number, priority?: number) {
            callbacks.push({ src, cb, timeout, priority });
            if (!inWork) next();
        },
    };
};

export default Loader();
