import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";

const handler=nc().use(auth);

handler.put(async(req,res)=>{
    try {
        connectDb();
        const {product_id,style}=req.body;
        const user=await User.findById(req.user);
        const exist=user.wishlist.find(
            (x)=>x.product == product_id && x.style == style
        );
        if(exist){
            return res
            .status(400)
            .json({message:"Product already exist in your wishlist."});
        }

        await User.updateOne(
            {_id:req.user},
            {
            $push:{
                wishlist:{
                    product:product_id,
                    style,
                },
            },
        });

        disconnectDb();
        res.status(200).json({message:"Product successfully added to your wishlist correctly"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message});
    }
});

export default handler;