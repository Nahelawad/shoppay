import React from "react";
import styles from './styles.module.scss';
import Link from "next/link";

export default function Newsletter(){
    return(
        <div className={styles.footer__newsletter}>
            <h3>SIGN UP FOR OUR NEWSLETTER</h3>
            <div className={styles.footer__flex}>
                <input type="text" placeholder="Your email address"></input>
                <button className={styles.btn_primary}>Subscribe</button>
            </div>
            
            <p>
                By clicking the SUBSCRIBE button, you are agreeing to {" "}
                <Link href="">ourPrivacy & Cookie policy</Link>

            </p>
            
             </div>
    )
}