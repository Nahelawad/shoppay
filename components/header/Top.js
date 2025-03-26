import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountCircleLine,RiArrowDropDownFill  } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

export default function Top({country}){
  
    const { data: session } = useSession();
    const[visible,setVisibale]=useState(false);

    return <div className={styles.top}>
        <div className={styles.top__container}>
         
         <div></div>
         <ul className={styles.top__list}>
            <li className={styles.li}>
                <img src= {country.flag}/>
               
               
                <span>{country.name}</span>
                
            </li>

            <li className={styles.li}>
            <MdSecurity />
                <span>Buyer Protection</span>
            </li>

            <li className={styles.li}>
                <span>Customer Service</span>
            </li>
            <li className={styles.li}>
                <span>Help</span>
            </li>
            <li className={styles.li}>
            <BsSuitHeart />
             <Link href="/profile/wishlist">
             <span>whishlist</span>
             </Link>
             
            </li>

           <li className={styles.li}
           onMouseOver={()=>setVisibale(true)} 
           onMouseLeave={()=>setVisibale(false)} 
           >

           {
                session?(
                    <li className={styles.li}>
                <div className={styles.flex}>
                <img src={session.user.image} />
                <span>{session.user.name}</span>
                <RiArrowDropDownFill />


                </div>
            </li>
                ):(
                    <li className={styles.li}>
                <div className={styles.flex}>
                <RiAccountCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />


                </div>
            </li>
                )}

         {
            visible &&  <UserMenu session={session} />
         }

           </li>
            
         </ul>

        </div>
    </div>;
}