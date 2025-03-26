import axios from "axios";

export const saveCart = async(cart)=>{
    try{
        const { data }= await axios.post("/api/user/saveCart", {
            cart,
        });
        return data;

    }catch(error){
        return error.response?.data?.error?.message|| "An error occurred";

    }
};

export const saveAddress = async(address)=>{
    try{
        const { data }= await axios.post("/api/user/saveAddress", {
            address,
        });
        return data;

    }catch(error){
        return error.response?.data?.error?.message|| "An error occurred";

    }
};


export const changeActiveAddress = async(id)=>{
    try{
        const { data }= await axios.put("/api/user/manageAddresss", {
            id,
        });
        return data;

    }catch(error){
        return error.response?.data?.error?.message|| "An error occurred";

    }
};

export const deleteAddress = async(id)=>{
    try{
        const { data }= await axios.delete("/api/user/manageAddresss", {
            data:{id},
        });
        return data;

    }catch(error){
        return error.response?.data?.error?.message|| "An error occurred";

    }
};


export const applyCoupon = async(coupon)=>{
    
        const { data }= await axios.post("/api/user/applyCoupon", {
            coupon,
        });
        return data;
     
    }
