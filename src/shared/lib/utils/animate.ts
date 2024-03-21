interface AnimateProps {
    timing: (fraction: number) => number;
    draw: (progress: number) => void;
    duration: number;
    onComplete?: () => void;
}

export function animate({ 
    timing, 
    draw, 
    duration, 
    onComplete = () => {} 
}: AnimateProps) {
    let start = performance.now();
    let raf: number | null = null;

    raf = requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            raf = requestAnimationFrame(animate);
        } else {
            onComplete();
        }
    });

    return {
        destroy: () => raf && cancelAnimationFrame(raf)
    }
}
