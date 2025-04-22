import styles from "./styles.module.scss";
import Link from "next/link";

export default function Header(){
    return(

        <div className={styles.header}>
          <ul>
            <li>
              <Link href="/browse"> Store</Link>
            </li>
            <li>
              <Link href="/browse"> Electronics</Link>
            </li>
            <li>
              <Link href="/browse"> Watches</Link>
            </li>
          </ul>

          </div>


    );
}