import React, { useEffect, useState } from "react";

export interface Slide {
    component: React.ComponentType<any>;
    icon?: string;
    logo?: string;
    text?: string;
    button?: React.ReactNode;
}

interface CarouselProps {
    slides: Array<Slide>;
    interval?: number;
    transitionDuration?: number;
    withDots?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
                                               slides,
                                               interval = 4000,
                                               transitionDuration = 400,
                                               withDots = false,
                                           }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, interval);

        return () => clearInterval(slideInterval);
    }, [interval]);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

        setTimeout(() => {
            setIsAnimating(false);
        }, transitionDuration);
    };

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);

        setTimeout(() => {
            setIsAnimating(false);
        }, transitionDuration);
    };

    return (
        <div
            style={styles.carouselContainer}
            aria-label="Image Carousel"
            role="region"
            aria-roledescription="carousel"
        >
            <div
                style={{
                    ...styles.carouselSlide,
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: `transform ${transitionDuration}ms ease`,
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} style={styles.slide}>
                        {React.createElement(slide.component)}
                    </div>
                ))}
            </div>

            {slides.length > 1 && withDots && (
                <div
                    style={styles.dotContainer}
                    role="tablist"
                    aria-label="Slide navigation"
                >
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            style={{
                                ...styles.dot,
                                backgroundColor: index === currentIndex ? "#C8047D" : "#D0D0D0",
                            }}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carousel;

// Define style object
const styles = {
    carouselContainer: {
        position: "relative" as const,
        width: "100%",
        overflow: "hidden" as const,
    },
    carouselSlide: {
        display: "flex" as const,
        height: "100%",
        transition: "transform 0.5s ease-in-out",
    },
    slide: {
        minWidth: "100%",
        height: "100%",
    },
    dotContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginTop: "16px",
    },
    dot: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        transition: "background-color 0.3s",
        border: "none",
        cursor: "pointer",
    },
};
