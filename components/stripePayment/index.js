import { loadStripe } from "@stripe/stripe-js";
import styles from "./styles.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import Form from "./Form";

export default function StripePayment({total,order_id,stripe_public_key}){
   const stripePromise=loadStripe(stripe_public_key);
   
   
    return(
        <>

<Elements stripe={stripePromise}>

<Form total={total} order_id={order_id}/>

</Elements>
        </>
        
    );
}