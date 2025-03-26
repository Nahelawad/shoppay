import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../../components/buttons/circeldiconbtn";
import LoginInput from "../../../components/inputs/logininput";
import Link from "next/link";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import DotLoaderspinner from "../../../components/loaders/dotLoader";
import jwt from "jsonwebtoken";
import {getSession, signIn} from "next-auth/react";
import { Router } from "next/router";
import { redirect } from "next/dist/server/api-utils";


export default function reset({user_id}){
    console.log("token",user_id);
  const [password,setPassword]=useState("");
  const [conf_password,setConf_Password]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const [loading,setLoading]=useState("");
  const passwordValidation=Yup.object({
    password:Yup.string()
        .required("please enter your new password")
        .min(6,"Password must be atleast 6 characters")
        .max(16,"Password can't be more than 16 characters"),
        conf_password:Yup.string().required("Confirm your password.")
        .oneOf([Yup.ref("password")],"Passwords must match."),})

  const resetHandler=async() =>{
    
    try {
        setLoading(true);
        const {data}=await axios.put("/api/auth/reset",{
            user_id,
            password,
        });

        let options={
            redirect:false,
            email:data.email,
            password:password,
        };
        await signIn("credentials",options);
        window.location.reload(true);
        setSuccess(data.message);
       
        Router.push("/");
        
        
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
               Reset your password? <Link href="/">Login instead</Link>
            </span>
            </div>

            
                <Formik
                enableReinitialize
                initialValues={{
                    password,conf_password
                }}
                validationSchema={passwordValidation} 
                onSubmit={()=>{
                    resetHandler();
                }}
                >
                    {
                        (form)=>(
                            <Form>
                                
                                <LoginInput 
                                type="password"
                                name="password"
                                icon="password" 
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                                <LoginInput 
                                type="password"
                                name="conf_password"
                                icon="password" 
                                placeholder="Confirm Password"
                                onChange={(e)=>setConf_Password(e.target.value)}
                                />
                                 
                                <CircledIconBtn type="submit" text="Change password"/>
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

export async function getServerSideProps(context) {
    const {query,req}=context;
    const session=await getSession({req});
    if(session){
        return{
            redirect:{
                destination:"/",
            },
        };
    }
    const token=query.token;
    const user_id=jwt.verify(token,process.env.RESET_TOKEN_SECRET);

    return {
        props:{
            user_id:user_id.id,
        }
    }
    
}