import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { BsFillHeartFill } from "react-icons/bs";
import React, { useRef, useState } from 'react';
import { signOut,signIn } from "next-auth/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';



// import required modules
import { EffectCards,Navigation } from 'swiper/modules';
import { userSwiperArray } from "../../../data/home";


export function User(){
    const {data:session}=useSession();
    return (
        <div className={styles.user}>

            <div className={styles.user__container}>

                {
                    session?(<div className={styles.user__infos}>
                        <img src={session.user.image}/>
                        <h4>{session.user.name}</h4>
                    </div>)
                    :(
                        <div className={styles.user__infos}>
                            <img
                            src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                            />

                            <div className={styles.user__infos_btns}>
                                <button  onClick={()=>signIn()}> Register </button>
                                <button  onClick={()=>signIn()}>Login</button>
                            </div>
                        </div>
                    )}

                    <ul className={styles.user__links}>
                        <li>
                            <Link href="/">
                            <IoSettingsOutline/>
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                            <HiOutlineClipboardList/>
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                            <AiOutlineMessage />
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                            <BsFillHeartFill/>
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.user__swiper}>

                            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards,Navigation]}
                className="userMenu__swiper"
                style={{maxWidth:"180px",height:"240px",marginTop:"1rem",}}
                
                >
                    {userSwiperArray.map((item)=>(

                  <SwiperSlide>
                    <Link href="">
                    <img src={item.image} alt=""/>
                    </Link>
                  </SwiperSlide>

                    ))}
                
             </Swiper>


                    </div>

            </div>
        </div>
    )
   

}