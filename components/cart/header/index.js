import Link from "next/link";
import styles from "./styles.module.scss";
import { MdPlayArrow } from "react-icons/md";


export default function Header(){
    return <div className={styles.header}>
       <div className={styles.header__container}>
        <div className={styles.header__left}>
            <Link href="/">
            <img src="../../../site.png" />
            </Link>
        </div>

        <div className={styles.header__right}>
            <Link href="/browse">

            
                Continue Shopping
                <MdPlayArrow/>
            
            
            </Link>
            
            </div>
        
        </div> 
    </div>;
}