import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Main({searchHandler}) {
  const router=useRouter();
  const [query,setQuery]=useState(router.query.search || "");
  let cartHold=0;
  const {cart}=useSelector((state)=>({...state}));
  const handleSearch =(e)=>{
    e.preventDefault();
      if(router.pathname !=="/browse"){
        if(query.length>1){
           router.push(`/browse?search=${query}`);
        }
       
      }else{
        searchHandler(query)
      }
  };
  const cartQty=cart.cartItems.map((cart,i)=>(cartHold+=cart.qty))
    
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        
        <Link href="/" className={styles.logo}>
         <img src="../../../site.png"></img>
        </Link>

        
        <form onSubmit={(e)=> handleSearch(e)} className={styles.search}>
          <input type="text" placeholder="Search" value={query}  onChange={(e)=>setQuery(e.target.value)}/>
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line/>
          </button>
        </form>

       
        <Link href="/cart" className={styles.cart}>
        <FaShoppingCart/>
          <span className={styles.cartCount}>{cartHold}</span>
        </Link>
      </div>
    </div>
  );
}
