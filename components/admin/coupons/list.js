
import styles from "./styles.module.scss";
import ListItem from "./ListItem";

export default function List({coupons,setCoupons}){
    return (
        <div className={styles.list}>
            {
                coupons.map((coupon)=>(
                    
                    <ListItem
                    coupon={coupon}
                    key={coupon._id}
                    setCoupons={setCoupons}                    
                    />
                ))
            }
            
        </div>


    )
    
}