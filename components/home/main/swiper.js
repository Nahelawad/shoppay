import styles from "./styles.module.scss";

import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import {Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Mainswiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mainSwiper"
      >

      {
        [...Array(5).keys()].map((i)=>(
            <SwiperSlide>
            <img src={`../../../images/swiper/${i+1}.jpg`} />
        </SwiperSlide>

        ))
      }

       

        
      </Swiper>
    </>
  );
}
