"use client"
import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import styles from './swiper.module.css';


import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function SwiperComponent({ openings }) {
    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className={styles.swiper}
            >
                {openings.map(o => (
                    <SwiperSlide className={styles.swiperSlide} key={o.src}>
                        <Image src={o.image} />
                        <h3>{o.title}</h3>
                    </SwiperSlide>
                ))}


            </Swiper>
        </>
    );
}