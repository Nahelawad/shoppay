import { useState } from "react"
import styles from "./styles.module.scss"
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "../../inputs/admininput";
import { toast } from "react-toastify";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { TextField } from "@mui/material";

export default function Create({setCoupons}){

    const [name,setName]=useState("");
    const [discount,setDiscount]=useState(0);
    const tomorrow=new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const [startDate,setStartDate]=useState(new Date());
    const [endDate,setEndDate]=useState(tomorrow);

    const handleStartDate=(newValue)=>{
        setStartDate(newValue);
    }

    const handleEndDate=(newValue)=>{
        setEndDate(newValue);
    }

    console.log(startDate,endDate);
    
    const validate=Yup.object({
        name:Yup.string().required("Coupon name is required").min(2,"Coupon name must be atleast 2 characters").max(30,"category name must be atleast 2 and 30 characters")
        .matches(/^[a-zA-Z\s]*$/,"Numbers and special character are not allowed"),
        discount:Yup.number()
        .required("Discount is required")
        .min(1,"Discount must be atleast 1%")
        .max (99,"Discount must be 99% or less")
    });

    const submitHandler=async ()=>{
        try {
            if(startDate.toString()==endDate.toString()){
                toast.error("You can't pick the same Dates.")
            }else if(endDate.getTime()-startDate.getTime()<0){
                return toast.error("Start Date cannot be more than the end date")
            }
            const {data }= await axios.post(
                "/api/admin/coupon",{coupon:name,discount,startDate,endDate,});
                setCoupons(data.coupons);
                setName("");
                setDiscount(0);
                setStartDate(new Date());
                setEndDate(tomorrow);
                toast.success(data.message);
            
        } catch (error) {
            toast.error(error?.response?.data?.message);
            
        }

    };
    return(
        <>
            <Formik 
            enableReinitialize
            initialValues={{name,discount}}
            validationSchema={validate}
            onSubmit={()=>{
                submitHandler();
            }}
            >
                {
                    (formik)=>(
                        <Form>
                           <div className={styles.header}> Create a Coupon</div> 
                           <AdminInput
                           type="text"
                           Label="Name"
                           name="name"
                           placeholder="Coupon name"
                           onChange={(e)=>setName(e.target.value)}
                           />
                            <AdminInput
                           type="number"
                           Label="Discount"
                           name="discount"
                           placeholder="Discount"
                           onChange={(e)=>setDiscount(e.target.value)}
                           />
                          
                          <div className={styles.date_picker}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>

                              <DesktopDatePicker
                              label="Start Date"
                              inputFormat="MM/dd/yyyy"
                              value={startDate}
                              onChange={handleStartDate}
                              renderInputs={(params)=> <TextField {...params}/>}
                              minDate={new Date()}
                              />  

                            <DesktopDatePicker
                              label="End Date"
                              inputFormat="MM/dd/yyyy"
                              value={endDate}
                              onChange={handleEndDate}
                              renderInputs={(params)=> <TextField {...params}/>}
                              minDate={tomorrow}
                              />  

                            </LocalizationProvider>

                          </div>


                           <div className={styles.btnWrap}>
                           <button type="submit" className={`${styles.btn}`}>
                            <span>
                                Add Coupon
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