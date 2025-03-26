import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart.js";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);


handler.post(async (req,res)=>{
    try{
        connectDb();
        const {address}=req.body;
        const user= await User.findById(req.user);
        await user.updateOne({
            $push:{
                address:address,
            },
        },{new:true});
        
        
        disconnectDb();
        return res.json({addresses:user.address});

       
    } catch(error){
        return res.status(500).json({message:error.message});
    }

});

export default handler;


