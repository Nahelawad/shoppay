import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Size from "./Size";
import { useRouter } from "next/router";

export default function SizesFilter({sizes , sizeHandler}){

    const router =useRouter();
    const existedSize=router.query.size || "";
    
    const [show,setShow]=useState(true);
    
    
    return (
        <div className={styles.filter}>
            <h3>
                Sizes
                <span>
                    {
                        show? <FaMinus/> : <BsPlusLg/>
                    }
                </span>
            </h3>

            {
                show && (
                    <div className={styles.filter__sizes}>
                        {
                            sizes.map((size, i) => (
                                <div key={i} onClick={() => sizeHandler(existedSize ? `${existedSize}_${size}` : size)}>
                                  <Size size={size} sizeHandler={sizeHandler} />
                                </div>
                              ))
                              
                        }


                    </div>
                )
                
            }
        </div>
    )
}