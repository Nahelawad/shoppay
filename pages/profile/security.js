import Head from "next/head";
import Layout from "../../components/profile/layout";
import { getSession, signOut } from "next-auth/react";
import * as Yup from "yup";
import { Formik,Form } from "formik";
import { useState } from "react";
import CircledIconBtn from "../../components/buttons/circeldiconbtn";
import LoginInput from "../../components/inputs/logininput";
import axios from "axios";
import styles from "../../styles/profile.module.scss";

export default function index({user,tab}){
    const [current_name,setCurrent_name]=useState(user?.user?.name || "");
    const [name,setName]=useState("");
    const [current_email,setCurrent_email]=useState(user?.user?.email || "");
    const [email,setEmail]=useState("");
    const [current_password,setCurrent_password]=useState("");
    const [password,setPassword]=useState("");
    const [conf_password,setConf_password]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");

    

     const validate=Yup.object({
            current_name:Yup.string().required("Please provide your Name")
            .min(2,"First name must be between 2 and 16 characters.")
            .max(16,"First name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]/,"Number and special characters are not allowed."),
            name:Yup.string().required("Please provide your Name")
            .min(2,"First name must be between 2 and 16 characters.")
            .max(16,"First name must be between 2 and 16 characters.")
            .matches(/^[aA-zZ]/,"Number and special characters are not allowed."),
            current_email:Yup.string().required("you will need this to reset the password please type your email")
            .email("Enter a valid email address."),
            email:Yup.string().required("you will need this to reset the password please type your email")
            .email("Enter a valid email address."),
            current_password:Yup.string()
            .required("Enter a combantion of atleasr six numbers letter and punctuation marks (such as ! and &).")
            .min(6,"Password must be atleast 6 characters")
            .max(16,"Password can't be more than 16 characters"),
            password:Yup.string()
            .required("Enter a combantion of atleasr six numbers letter and punctuation marks (such as ! and &).")
            .min(6,"Password must be atleast 6 characters")
            .max(16,"Password can't be more than 16 characters"),
            conf_password:Yup.string().required("Confirm your password.")
            .oneOf([Yup.ref("password")],"Passwords must match."),
        });
    

    const ChangeDetailsHandler=async ()=>{
        try {
            const {data}=await axios.put("/api/user/changeDetails",{
                current_name,
                current_email,
                current_password,
                name,
                email,
                password,
            });
            setError("");
            setSuccess(data.message);
            signOut();
            
        } catch (error) {
            setSuccess("");
            setError(error.response?.data?.message);
            
        }

    };

    return (
        <Layout session={user.user} tab={tab}>
            <Head>
                <title>
                    Profile-Security
                </title>
            </Head>

            WELCOME TO YOUR USER DETAILS<h1 style={{fontWeight:"bold", paddingBottom:"23px"}}>{user.user.name}</h1>






                   <div style={{marginRight:"500px"}}>
                   <Formik
                            enableReinitialize
                            initialValues={{
                                current_name,
                                name,
                                current_email,
                                email,
                                current_password,
                                password,
                                conf_password



                            }}
                            validationSchema={validate} 
                            onSubmit={()=>{
                                ChangeDetailsHandler();
                            }}
                            >
                                {
                                    (form)=>(
                                        <Form style={{width: "500px", maxWidth: "600px"}}>
                                            <LoginInput 
                                            type="text"
                                            name="current_name"
                                            icon="user" 
                                            placeholder="Your current Name"
                                            onChange={(e)=>setCurrent_name(e.target.value)}
                                            readOnly
                                            />
                                            <LoginInput 
                                            type="text"
                                            name="name"
                                            icon="user" 
                                            placeholder="Your New Name"
                                            onChange={(e)=>setName(e.target.value)}
                                            />
                                             <LoginInput 
                                            type="text"
                                            name="current_email"
                                            icon="email" 
                                            placeholder="Your current Email"
                                            onChange={(e)=>setCurrent_email(e.target.value)}
                                            readOnly
                                            />
                                            <LoginInput 
                                            type="text"
                                            name="email"
                                            icon="email" 
                                            placeholder="Your New Email Address"
                                            onChange={(e)=>setEmail(e.target.value)}
                                            />


                                             <LoginInput 
                                            type="password"
                                            name="current_password"
                                            icon="password" 
                                            placeholder="Current Password"
                                            onChange={(e)=>setCurrent_password(e.target.value)}
                                            />

                                            <LoginInput 
                                            type="password"
                                            name="password"
                                            icon="password" 
                                            placeholder="New Password"
                                            onChange={(e)=>setPassword(e.target.value)}
                                            />
                                             <LoginInput
                                            type="password"
                                            name="conf_password"
                                            icon="password" 
                                            placeholder="confirm password"
                                            onChange={(e)=>setConf_password(e.target.value)}
                                            />


                                            <CircledIconBtn type="submit" text="Update Details"/>
                                            

                                            {
                                                error && <span className={styles.error} style={{color:"red"}}>{error}</span>
                                            }

                                            {
                                                success && <span className={styles.success} style={{color:"red"}}>{success}</span>
                                            }
            
            
                                    
                                        </Form>
                                    )
                                }
            
                
            
                            </Formik>
                   </div>

                            
            
        </Layout>
    )
}

export async function getServerSideProps(ctx){
    const {query,req}=ctx;
    const session= await getSession({req});
    const tab=query.tab || 0;
    return{
        props:{
           user: session,
            tab,
        },
    };
}