import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Coupon from "../../../models/Coupon";
import Cart from "../../../models/Cart.js";
import auth from "../../../middleware/auth";

const handler = nc();


handler.post(async (req,res)=>{
    try{
        connectDb();
        const {coupon,startDate,endDate,discount}=req.body;
        const test=await Coupon.findOne({coupon});
        if(test){
            return res.status(400).json({message:"This coupon name already exists,try a different name"});
        }
        await new Coupon({
            coupon,startDate,endDate,discount
        }).save();
        
        disconnectDb();
        return res.json({
             message:"Coupon created successfully !",
             coupons:await Coupon.find({}),
        }
           
        );

       
    } catch(error){
        return res.status(500).json({message:error.message});
    }

});

export default handler;


