import React, { useState } from 'react';
import SwiperCore, { SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowButton } from 'shared/components/@buttons/arrow-button';
import { IBlog } from 'shared/lib/types';
import { BlogItem } from '../blog-item';
import { fileServerPath } from 'shared/lib/utils/file-server-path';
import { MediaQuery } from 'shared/ui/media-query';
import css from './blog-slider-layout.module.scss';
import clsx from 'clsx';

interface Props {
    title: string;
    data: IBlog[];
    animated?: boolean;
}

export const BlogSliderLayout: React.FC<Props> = ({
    data,
    title,
    animated
}) => {
    const [swiperCore, setSwiperCore] = useState<SwiperCore>();
    const [activeIndex, setActiveIndex] = useState(0);

    const options: SwiperOptions = {
        slidesPerView: 'auto',
        allowTouchMove: false,
        breakpoints: {
            1366: {
                slidesPerView: 4
            }
        }
    };

    const Controls = () => (
        <div className={css.controls}>
            <ArrowButton 
                className={css.controls_btn}
                onClick={() => swiperCore?.slidePrev()}
                disabled={swiperCore?.isBeginning} 
                variant="prev" 
            />
            <ArrowButton 
                className={css.controls_btn}
                onClick={() => swiperCore?.slideNext()}
                disabled={swiperCore?.isEnd}
            />
        </div>
    );

    return (
        <div className={clsx(css.root, animated && 'aos')} data-aos-offset="40%">
            <div className="container">
                <div className={css.wrapper}>
                    <div className={css.header}>
                        <h2 className={css.title}>
                            {title}
                        </h2>

                        <MediaQuery 
                            query="(min-width: 769px)"
                            children={<Controls />}
                        />
                    </div>

                    <div className={css.slider}>
                        <Swiper 
                            {...options} 
                            className={css.swiper}
                            onInit={setSwiperCore}
                            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                        >
                            {data.map((item) => (
                                <SwiperSlide 
                                    className={css.swiper_slide} 
                                    key={item.id}
                                >
                                    <BlogItem 
                                        imageSrc={item.image.url}
                                        title={item.title}
                                        categoryName={item.category.name}
                                        timeToRead={item.timeToRead}
                                        createdAt={item.date}
                                        url={item.link}
                                        className={css.blog}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <MediaQuery 
                        query="(max-width: 768px)"
                        children={<Controls />}
                    />
                </div>
            </div>
        </div>
    );
}