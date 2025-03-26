import Link from "next/link";
import Menu from "./Menu"
import Offers from "./offers"
import styles from "./styles.module.scss"
import Mainswiper from "./swiper"
import { User } from "./User"
import Header from "./Header"


export default function Main(){
    return(
        <div className={styles.main}>
          <Header/>
          <Menu/>
          <Mainswiper/>
          <Offers/>
          <User/>
        </div>
        
    )
}