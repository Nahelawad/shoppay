import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart.js";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);


handler.put(async (req,res)=>{
    try{
        connectDb();
        const {paymentMethod}=req.body;
        const user= await User.findById(req.user);
        await user.updateOne({
            defaultPaymentMethod:paymentMethod,
        },{
            returnOriginal:false,
        });
           
        
        
        disconnectDb();
        return res.json({paymentMethod:user.defaultPaymentMethod});

       
    } catch(error){
        return res.status(500).json({message:error.message});
    }

});

export default handler;


