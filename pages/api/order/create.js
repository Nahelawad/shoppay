import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Coupon from "../../../models/Coupon";
import Cart from "../../../models/Cart.js";
import Order from "../../../models/Order";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);


handler.post(async (req,res)=>{
    try{
        connectDb();
        const {products,shippingAddress,paymentMethod,total,totalBeforeDiscount,couponApplied}=req.body;
        const user=await User.findById(req.user);
        const newOrder=await new Order({
            user:user._id,
            products,
            shippingAddress,
            paymentMethod,
            total,
            totalBeforeDiscount,
            couponApplied,

        }).save();

        
        disconnectDb();
        return res.json({
            order_id:newOrder._id,
        }
           
        );

       
    } catch(error){
        return res.status(500).json({message:error.message});
    }

});

export default handler;


