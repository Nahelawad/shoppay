import styles from "./styles.module.scss";

export default function PaymentMethods(){
    return(
        <div className={`${styles.card} ${styles.cart__method}`}>
            <h2 className={styles.header}> Payment Methods </h2>
            <div className={styles.images}>
                <img src="../../../images/payment/visa.png"/>
                <img src="../../../images/payment/Mastercard.png"/>
                <img src="../../../images/payment/Paypal.png"/>
            </div>

            <h2 className={styles.header}>Buyer Protection</h2>
            <div className={styles.protection}>
            <img src="../../../images/protection.webp" />
            Get full refund if the item is not as described when delivered or if it is not delivered
              
            </div>
            
            
        </div>

    )
}