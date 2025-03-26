import { useState } from "react";
import styles from "./styles.module.scss";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
const CARD_OPTIONS={
    iconStyle:"solid",
    style:{
        base:{
            ///iconColor:"#000",
            ///color:"#000",
            ///fontSize:"16px",
            fontSmoothing:"antialiased",
            ":-webkit-autofill":{color:"#000"},
            ///"::placeholder":{color:"#000"},
        },
        invalid:{
            iconColor:"#FFC7EE",
            color:"#FFC7EE"
        },
    },
};

export default function Form({total,order_id}) {
     const [error,setError]=useState("");
     const stripe=useStripe();
     const elemnts=useElements();



    const handleSubmit= async (e)=>{
        e.preventDefault();
        const{error,paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card:elemnts.getElement(CardElement),
        });

        if(!error){
            try{
                const {id}=paymentMethod;
                const res= await axios.post(`/api/order/${order_id}/paywithStripe`,{
                    amount:total,
                    id,
                });
                if(res.data.success){
                    window.location.reload(false);
                }
            }catch(error){
                setError(error.response?.data?.message || error.message || "An unexpected error occurred");
            }
        }else{
            setError(error.response?.data?.message || error.message || "An unexpected error occurred");
        }


    };
    
    return (
    <div className={styles.stripe}>
        <form onSubmit={handleSubmit}>
            <CardElement options={CARD_OPTIONS}/>
           <button type="submit">PAY</button>

           {error && <span className={styles.error}>{typeof error=== "string"?error:JSON.stringify(error)}</span>}
        </form>
        
    </div>
  )  
}