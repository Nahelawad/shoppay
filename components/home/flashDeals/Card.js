import Link from "next/link";
import styles from "./styles.module.scss";
import { MdFlashOn } from "react-icons/md";

export default function FlashCard({ product }) {
    const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);
    const amountSaved = (product.price - discountedPrice).toFixed(2);

    return (
        <div className={styles.card}>
            <div className={styles.card__img}>
                <Link href={product.link}>
                    <img src={product.image} />
                </Link>
                <div className={styles.flash}>
                    <MdFlashOn />
                    <span>-{product.discount}%</span>
                </div>
            </div>
            <div className={styles.card__price}>
                <span> GBP {discountedPrice} £</span>
                <span> -GBP {amountSaved} £</span>
            </div>
            <div className={styles.card__bar}>
                <div className={styles.card__bar_inner} style={{ width: "75%" }}></div>
            </div>
            <div className={styles.card__percentage}>{product.sold}%</div>
        </div>
    );
}
