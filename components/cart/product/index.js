import { BsHeart } from "react-icons/bs";
import styles from "./styles.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../store/cartSlice";
import { useEffect, useState } from "react";
export default function Product( { product ,selected, setSelected}) {
    const {cart}=useSelector((state)=>({...state}));
    const [active,setActive]=useState();
    useEffect(()=>{
        const check = selected.find((p)=>p._uid == product._uid);
        setActive(check);
    },[selected]);
    const dispatch=useDispatch();
    const updateQty=(type)=>{
        let newCart=cart.cartItems.map((p)=>{
            if(p._uid == product._uid){
                return {
                    ...p,
                    qty:type == "plus"? product.qty+1 : product.qty-1,
                };
            }
            return p;
        });
        dispatch (updateCart(newCart));

    };
    const removeProduct=(id)=>{
        if(!cart?.cartItems || cart.cartItems.length === 0) return;
        let newCart=cart.cartItems.filter((p)=>{
            return p._uid !=id;
        });
        dispatch(updateCart(newCart));
    }

    const handleSelect=()=>{
        if(active){
            setSelected(selected.filter((p)=>p._uid !== product._uid));
            
        }else{
            setSelected([...selected,product]);
        }
    }

    useEffect(() => {
        console.log("Updated selected products:", selected);
    }, [selected]);

   
    return(
        <div className={`${styles.card} ${styles.product}`}>
            {
                product.quantity > 1 && <div className={styles.blur}></div>
            }
            <div className={styles.product__header}>
                <img src="../../../images/store.png"/>
                Nahel official store
            </div>
            <div className={styles.product__image}>
                <div className={`${styles.checkbox} ${active? styles.active:""}`}
                onClick={()=>handleSelect()}></div>
                <img src={product.images[0].url}/>
                <div className={styles.col}>
                    <div className={styles.grid}>
                        <h1>
                            {
                                product.name.length > 30 ? `${product.name.substring(0,30)}`: product.name
                            }
                        </h1>

                        <div style={{zIndex:'2'}}>
                            <BsHeart/>
                        </div>
                        <div style={{zIndex:'2'}} onClick={()=> removeProduct(product._uid)}>
                            <AiOutlineDelete/>
                        </div>

                    </div>
                    <div className={styles.product__style}>
                        <img src={product.color.image}/>

                        {
                            product.size && <span>{product.size}</span>
                        }
                        {
                            product.price && <span>{product.price.toFixed(2)} £</span>
                        }
                        <MdOutlineKeyboardArrowRight/>
                    </div>
                    <div className={styles.product__priceQty}>
                        <div className={styles.product__priceQty_price}>
                            <span className={styles.price}>
                                GBP {(product.price*product.qty).toFixed(2)}£
                            </span>
                            {
                                product.price !== product.priceBefore &&(
                                    <span className={styles.priceBefore}>
                                        GBP {product.priceBefore}£
                                    </span>
                                )}

                                {
                                    product.discount > 0 &&(
                                        <span className={styles.discount}> -{product.discount}% </span>
                                    )
                                }


                        </div>
                        <div className={styles.product__priceQty_qty}>
                             <button disabled={product.qty<2} onClick={()=> updateQty("minus")} >-</button> 
                                <span>{product.qty}</span> 
                             <button disabled={product.qty == product.quantity}onClick={()=> updateQty("plus")} >+</button> 
                        </div>
                    </div>
                    <div className={styles.product__shipping}>
                         {
                            product.shipping? `+${product.shipping}£ shipping` : "Free shipping"
                         }
                    </div>
                    {
                        product.quantity<1 && 
                        <div className={styles.notAvalible}>
                            Product out of stock, you may add it to your wishlist till it be restocked
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}