import Link from "next/link";
import styles from "./styles.module.scss";
import { signOut,signIn } from "next-auth/react";

export default function UserMenu({session}){
    return   <div className={styles.menu}>
        <h4>Welcome to Shoppay!</h4>
        {session? (

<div className={styles.flex}> 
<img src= {session.user.image}

className={styles.menu__img}

/>
<div className={styles.col}>
    <span>Welcome back</span>
    <h3>{session.user.name}</h3>
    <span onClick={()=> signOut()}>Sign out</span>
</div>


</div>
        ):(
            <div className={styles.flex}>
                <button onClick={()=>signIn()} className={styles.btn_primary}>Register</button>
                <button onClick={()=>signIn()} className={styles.btn_outlined}>Login</button>
            </div>
        )}

        <ul>
            <li>
                <Link href="/profile">Account</Link> 
            </li>
            <li>
                <Link href="/profile/orders">My Orders</Link> 
            </li>
            <li>
                <Link href="/profile/messages">Message Center</Link> 
            </li>
            <li>
                <Link href="/profile/address">Address</Link> 
            </li>
            <li>
                <Link href="/profile/wishlist">wishlist</Link> 
            </li>
           
        </ul>

    </div>
}