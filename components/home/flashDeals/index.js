import { MdFlashOn } from "react-icons/md";
import styles from "./styles.module.scss";
import Countdown from "../../countdown/index";

import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { FlashDealsArray } from "../../../data/home";


// import required modules
import { Navigation } from 'swiper/modules';
import FlashCard from "./Card";

export default function FlashDeals(){
    return <div className={styles.flashDeals}>
        <div className={styles.flashDeals__header}>
            <h1>FLASH SALES

            <MdFlashOn/> 
            </h1>

            <Countdown date={new Date(2025,10,8,25)}/>
           
        </div>

        <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals__swiper"
       breakpoints={{
        450:{
          slidesPerView:2,
        },
        630:{
          slidesPerView:3,
        },
        920:{
          slidesPerView:4,
        },
        1232:{
          slidesPerView:5,
        }
       }}
      >
        <div className={styles.flashDeals__list}>
          {FlashDealsArray.map((product,i)=>(
            <SwiperSlide>
              <FlashCard product={product} key={i}/>
            </SwiperSlide>

          ))} </div>
        
      </Swiper>

    </div>;
}