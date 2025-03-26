import styles from "../../styles/forgot.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../components/buttons/circeldiconbtn";
import LoginInput from "../../components/inputs/logininput";
import Link from "next/link";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import DotLoaderspinner from "../../components/loaders/dotLoader";


export default function forgot(){
  const [email,setEmail]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const [loading,setLoading]=useState("");
  const emailValidation=Yup.object({
    email:Yup.string().required("you will need this to reset the password please type your email")
        .email("Enter a valid email address."),
  })
  const forgotHandler=async() =>{
    
    try {
        setLoading(true);
        const{data}=await axios.post("/api/auth/forgot",{
            email,
        });
        setError("");
        setSuccess(data.message);
        setLoading(false);
        setEmail("");
        
    } catch (error) {
        setLoading(false)
        setSuccess("");
        setError(error.response.data.message);
        
    }

  };
    return <>
    {
            loading && <DotLoaderspinner loading={loading}/>
        }
        <Header country=""/>
        <div className={styles.forgot}>
             
             <div>
               
             <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
            
          <BiLeftArrowAlt/>
       
            </div>  
            <span>
               Forgot your password? <Link href="/">Login instead</Link>
            </span>
            </div>

            
                <Formik
                enableReinitialize
                initialValues={{
                    email,
                }}
                validationSchema={emailValidation} 
                onSubmit={()=>{
                    forgotHandler();
                }}
                >
                    {
                        (form)=>(
                            <Form>
                                
                                <LoginInput 
                                type="text"
                                name="email"
                                icon="email" 
                                placeholder="Email Address"
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                                 
                                <CircledIconBtn type="submit" text="Reset Password"/>
                                {error &&(<span className={styles.error}>{error}</span>)}
                                {success &&(<span className={styles.success}>{success}</span>)}

                            </Form>
                        )
                    }

    

                </Formik>
                
                


            </div>

             </div>

        
        <Footer country=""/>
    </>;
}