import React from "react";
import styles from './styles.module.scss';

export default function Payment(){
    return(
        <div className={styles.footer__payment}>
            <h3>WE ACCEPT</h3>
            <div className={styles.footer__flexwrap}>
            <img src="/Mastercard.png"/>
            <img src="/Visa.png"/>
            <img src="/Paypal.png"/>

            </div>
        </div>
    )
}