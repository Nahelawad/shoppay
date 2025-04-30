import React, { useState } from "react";
import styles from './styles.module.scss';
import Link from "next/link";
import axios from "axios";

export default function Newsletter(){
    const [email,setEmail]=useState("");
    const [loading,setLoading]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");

    const subscribe=async ()=>{
        setSuccess("");
        setError("");

        try {
            setLoading(true);
            const {data} = await axios.post("/api/newsletter", {email});
            setSuccess(data.message);
            setLoading(false);
            setEmail("");
            
        } catch (error) {
            setSuccess("");
            setLoading(false);
            setError(error.response?.data?.message);
            
        }
    }
    
    return(
        <div className={styles.footer__newsletter}>
            <h3>SIGN UP FOR OUR NEWSLETTER</h3>
            <div className={styles.footer__flex}>
                <input type="text" placeholder="Your email address" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <button onClick={()=>subscribe()} disabled={loading === true} className={styles.btn_primary} style={{cursor:`${loading? "not-allowed":""}`}}>Subscribe</button>
            </div>
            {loading && <div >{loading}</div>}
            {error && <div className="error" style={{color:"red"}}>{error}</div>}
            {success && <div className="success"  style={{color:"green"}}>{success}</div>}
        
            <p>
                By clicking the SUBSCRIBE button, you are agreeing to {" "}
                <Link href="">ourPrivacy & Cookie policy</Link>

            </p>
            
             </div>
    )
}