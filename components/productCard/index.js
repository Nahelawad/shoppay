import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import ProductSwiper from "./ProductSwiper";

export default function ProductCard({product}){
   const [active,setAcitve]=useState(0);
   const [images,setImages]=useState(product.subProducts[active]?.images);
   const [prices,setPrices]=useState(
product.subProducts[active]?.sizes.map((s)=>{
return s.price;
   }).sort((a,b)=>{
     return a-b;
   })
);

const [styless,setStyless]=useState(product.subProducts.map((p)=>{
    return p.color;
}));

useEffect(()=>{
    setImages(product.subProducts[active].images);
    setPrices(product.subProducts[active]?.sizes.map((s)=>{
        return s.price;
           }).sort((a,b)=>{
             return a-b;
           }))

},[active]);

    return(
    <div className={styles.product}>
    <div className={styles.product__container}>
      <Link href={`/product/${product.slug}?style=${active}`}>

      <div>
         <ProductSwiper images={images}/>
      </div>
      </Link>
      {
         product.subProducts[active].discount ?(
            <div className={styles.product__discount}>
           - {
               product.subProducts[active].discount
            }%

         </div>

         ):(
            ""
         )
         
         }

         <div className={styles.product__infos}>
            <h1>
               {product.name.length>45?`${product.name.substring(0,45)}...`:
               product.name}
            </h1>

            <span>
               {
                  prices.length===1 ? `GBP ${prices[0]}£`:
                  `GBP ${prices[0]} -${prices[prices.length-1]}£`
               }
            </span>
            <div className={styles.product__colors}>
               {
                  styless && styless.map((style,i)=>(
                     style.image?
                     <img src={style.image}
                     className={i==active && styles.active}
                     onMouseOver={()=>{
                       setImages(product.subProducts[i].images); 
                       setAcitve(i);
                     }}
                     
                     />
                     
                     :(
                        <span style={{backgroundColor:`${style.color}`}}
                        
                        onMouseOver={()=>{
                           setImages(product.subProducts[i].images); 
                           setAcitve(i);
                         }}
                        
                        ></span>
                     )
                  ))
               }
            </div>
         </div>
    </div>
    </div>
   );
    
}