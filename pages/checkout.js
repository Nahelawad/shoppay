
import { getSession } from "next-auth/react";
import User from "../models/User";
import styles from "../styles/checkout.module.scss";
import Cart from "../models/Cart.js";
import { connectDb,disconnectDb } from "../utils/db";
import Header from "../components/cart/header";
import Shipping from "../components/checkout/shipping"
import { useEffect, useState } from "react";
import Products from "../components/checkout/products";
import Payment from "../components/checkout/payment";
import Summary from "../components/checkout/summary";
export default function checkout({cart,user}){
    const [addresses,setAddresses]=useState(user?.address || []);
    const [paymentMethod,setPaymentMethod]=useState("");
    const [totalAfterDiscount,setTotalAfterDiscount]=useState("");
    const [selectedAddress,setSelectedAddress]=useState("");  
    useEffect(()=>{
     let check=addresses.find((ad)=>ad.active==true);   
    if(check){
        setSelectedAddress(check);
    }else{
        setSelectedAddress("");
    }
    },[addresses]);
    return <>

    <Header/>

    <div className={`${styles.container} ${styles.checkout}`}>
     <div className={styles.checkout__side}>
        <Shipping
        user={user}
        addresses={addresses}
        setAddresses={setAddresses}
        />
        <Products
          cart={cart}
        />
     </div>


     <div className={styles.checkout__side}>
     <Payment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
     <Summary
      totalAfterDiscount={totalAfterDiscount}
      setTotalAfterDiscount={setTotalAfterDiscount}
      user={user}
      cart={cart}
      paymentMethod={paymentMethod}
      selectedAddress={selectedAddress}
     />
     </div>
     

    </div>
        
        
    </>
}

export async function getServerSideProps(context) {
    connectDb();
    const session=await getSession(context);
    if(!session){
        return{
            redirect:{
                destination:"/",
            },
        };
    }
    const user = await User.findById(session.user.id);
    const cart = await Cart.findOne({user:user._id});
    disconnectDb();

    if(!cart){
        return{
            redirect:{
                destination:"/cart",
            },
        };

    }

    return{
        props:{
            cart:JSON.parse(JSON.stringify(cart)),
            user:JSON.parse(JSON.stringify(user)),
        },
    };
    
}