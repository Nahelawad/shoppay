import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import ShippingInput from "../../inputs/shippinginput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "../../../data/countries";
import SingularSelect from "../../../components/select/SingularSelect";
import { saveAddress,changeActiveAddress,deleteAddress } from "../../../requests/user";
import { FaIdCard } from "react-icons/fa6";
import { GiPhone } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


const initialValues={
    firstName:"",
    lastName:"",
    phoneNumber:"",
    state:"",
    city:"",
    zipCode:"",
    address1:"",
    address2:"",
    country:"",

}

export default function Shipping( {user,addresses,setAddresses} ){

   
    const [shipping,setShipping]=useState(initialValues);
    const [visible,setVisible]=useState(user?.address.length?false:true);

    const{
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country
 }=shipping;

 const validate =Yup.object({
    firstName:Yup.string()
    .required("First name is required")
    .min(3,"First name must be atleast 3 characters long")
    .max(20,"First name must be less than 20 characters long"),

    lastName:Yup.string()
    .required("last name is required")
    .min(3,"last name must be atleast 3 characters long")
    .max(20,"last name must be less than 20 characters long"),

   phoneNumber: Yup.string()
  .required("Phone number is required")
  .min(3,"Phone number must be atleast 3 characters long")
  .max(20,"Phone number must be less than 20 characters long")
  .phone("GB", true, "Invalid phone number"),

  state:Yup.string()
    .required("State is required")
    .min(3,"State must be atleast 3 characters long")
    .max(20,"State must be less than 20 characters long"),

    city:Yup.string()
    .required("City is required")
    .min(3,"City must be atleast 3 characters long")
    .max(60,"City must be less than 60 characters long"),

    zipCode:Yup.string()
    .required("Zipcode/postal is required")
    .min(3,"Zipcode/postal must be atleast 3 characters long")
    .max(20,"Zipcode/postal must be less than 20 characters long"),
    address1:Yup.string()
    .required("address line 1 is required")
    .min(5,"address line 5 must be atleast 3 characters long")
    .max(100,"address line 5 must be less than 100 characters long"),

    address2:Yup.string()
    .min(2,"address2 must be atleast 2 characters long")
    .max(100,"address2 must be less than 100 characters long"),

    country:Yup.string()
    .required("country is required")
    .min(3,"country must be atleast 3 characters long")
    .max(20,"country must be less than 20 characters long"),
 });

 const handleChange=(e)=>{
    const { name, value}=e.target;
    setShipping({...shipping,[name]:value});
 };
 const  saveShippingHandler=async ()=>{
    const res=await saveAddress(shipping);
    console.log(res);
    setAddresses(res.addresses);
 };

 const  changeActiveHandler=async (id)=>{
    const res=await changeActiveAddress(id);
    setAddresses(res.addresses);
 };

 const deleteHandler=async(id)=>{
    const res=await deleteAddress(id);
    setAddresses(res.addresses);
 }


   return(
    <div className={styles.shipping}>
        <div className={styles.header}>
            <h3>
                Shipping Information
            </h3>

        </div>
        <div className={styles.addresses}>
            {
                addresses.map((address)=>(

                    <div style={{position:"relative"}}>
                    
                        
                        
                            <MdDeleteOutline
                             style={{fontSize:"2rem",
                                right:"1rem",
                                position:"relative",
                                left:"1rem"
                             }}
                            onClick={()=>deleteHandler(address._id)}/>
                        


                         <div
                    className={`${styles.address} ${address.active && styles.active}`}
                     key={address._id}
                    onClick={()=>changeActiveHandler(address._id)}
                    >
                        
                     <div className={styles.address__side}>
                        <img src={user.image} style={{height:"50px", width:"50px"}} alt=""/>
                     </div>
                     <div className={styles.address__col}>
                        <span>
                            <FaIdCard/>
                            {address.firstName} {" "} {address.lastName}
                        </span>
                        <span>
                            <GiPhone/>
                            {
                                address.phoneNumber
                            }
                        </span>

                     </div>
                     <div className={styles.address__col}>
                        <span>
                            <FaMapMarkerAlt/>
                            {address.address1}
                        </span>
                        <span>
                            {address.address2}
                        </span>

                        <span>
                            {address.city},{address.state},{address.country}
                        </span>
                        <span>
                            {address.zipCode}
                        </span>
                     </div>
                     <span className={styles.active__text} style={{display:`${!address.active && "none"}`}}>
                        Active
                     </span>
                    </div>


                    </div>

                   
                ))}
            

        </div>
        <button className={styles.hide_show} onClick={(prev)=>setVisible(!visible)}>
            {
                visible?(
                    <span>
                    <IoIosArrowDropupCircle style={{fontSize:"2rem",fill:"#222"}}/>
                </span>

                ) :(
                    <span>
                        ADD NEW ADDRESS <CiCirclePlus/>
                    </span>
                )

            }

        </button>
       {
        visible &&
        <Formik
        enableReinitialize
        initialValues={{
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            zipCode,
            address1,
            address2,
            country

        }}
        validationSchema={validate}
        onSubmit={()=>{
            saveShippingHandler();

        }}
        >
         {
            (formik)=>(

                <Form>
                    <SingularSelect
                      name="country"
                      value={country}
                      placeholder="*Country"
                      handleChange={handleChange}
                      data={countries}
                    />
                    
                    

                    <div className={styles.col}>
                    <ShippingInput
                    name="firstName"
                    placeholder="*First Name"
                    onChange={handleChange}
                    />
                   <ShippingInput
                    name="lastName"
                    placeholder="*Last Name"
                    onChange={handleChange}
                    />
                    </div>

                    <div className={styles.col}>
                    <ShippingInput
                    name="state"
                    placeholder="*City/Province"
                    onChange={handleChange}
                    />
                   <ShippingInput
                    name="city"
                    placeholder="*City"
                    onChange={handleChange}
                    />
                    </div>

                    <ShippingInput
                    name="phoneNumber"
                    placeholder="*Phone number"
                    onChange={handleChange}
                    />
                    <ShippingInput
                    name="zipCode"
                    placeholder="*Post/Zip code"
                    onChange={handleChange}
                    />

                    <ShippingInput
                    name="address1"
                    placeholder="*Address 1"
                    onChange={handleChange}
                    />

                    <ShippingInput
                    name="address2"
                    placeholder="Address 2"
                    onChange={handleChange}
                    />

                    <button type="submit">
                        Save information
                    </button>


                </Form>
            )
         }

        </Formik>
       }
    </div>

   )
   
}