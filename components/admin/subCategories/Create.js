import { useState } from "react"
import styles from "./styles.module.scss"
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "../../inputs/admininput";
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "../../select/SingularSelect";

export default function Create({categories,setSubCategories}){

    const [name,setName]=useState("");
    const [parent,setParent]=useState("");
    const validate=Yup.object({
        name:Yup.string().required("SubCategory name is required").min(2,"SubCategory name must be atleast 2 characters").max(30,"Subcategory name must be atleast 2 and 30 characters")
        .matches(/^[a-zA-Z\s]*$/,"Nubers and special character are not allowed"),
        parent:Yup.string().required("Please chose a Parent Category")
    });

    const submitHandler=async ()=>{
        try {
            const {data}= await axios.post(
                "/api/admin/subCategory",{name,parent})
                setSubCategories(data.subCategories);
                setName("");
                setParent("");
                toast.success(data.message);
            
        } catch (error) {
            toast.error(error?.response?.data?.message);
            
        }

    };
    
    return(
        <>
            <Formik 
            enableReinitialize
            initialValues={{name,parent}}
            validationSchema={validate}
            onSubmit={()=>{
                submitHandler();
            }}
            >
                {
                    (formik)=>(
                        <Form>
                           <div className={styles.header}> Create a SubCategory</div> 
                           <AdminInput
                           type="text"
                           Label="name"
                           name="name"
                           placeholder="Sub-Category name"
                           onChange={(e)=>setName(e.target.value)}
                           />
                           <SingularSelect name="parent" value={parent} data={categories}
                           placeholder="Select Category"
                           handleChange={(e)=>setParent(e.target.value)}
                           />
                           <div className={styles.btnWrap}>
                           <button type="submit" className={`${styles.btn}`}>
                            <span>
                                Add SubCategory
                            </span>
                           </button>

                           </div>
                        </Form>
                    )
                }

            </Formik>
        </>
    )

}