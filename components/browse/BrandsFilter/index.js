import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";


export default function BrandsFilter({brands,brandHandler,replaceQuery}){
    const router =useRouter();
    const [show,setShow]=useState(true);
   
    
    return (
        <div className={styles.filter}>
            <h3>
                Brands
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
                            brands.map((brand,i)=>{
                                
                                const check= replaceQuery("brand",brand);
                                return(
                                    <button
                                     key={brand}
                                         className={`${styles.filter__brand} ${check.active ? styles.activeFilter : ""}`} 
                                        onClick={() => {
                                        if (typeof check.result === "object") {
                                         const path = router.pathname;
                                         const { query } = router;
                                        delete query.brand;
                                         router.push({ pathname: path, query: query });
                                        } else {
                                        brandHandler(check.result);
                                                             }
                                                            }}
                                                            >
  <img src={`../../../images/brands/${brand}.png`} />
</button>

                               
                            );})}


                    </div>
                )
                
            }
        </div>
    )
}