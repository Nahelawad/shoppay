import styles from "../styles.module.scss";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function Size({size}){
    const [show,setShow]=useState(true);
    return (
        <div className={styles.filter__sizes_size}>
           
                    <input type="checkbox" name="size" id={size}/>
                    <label htmlFor={size}>
                        {
                            size
                        }
                    </label>
        </div>
    )
}