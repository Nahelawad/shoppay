import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart.js";
import auth from "../../../middleware/auth";
import { UsbTwoTone } from "@mui/icons-material";

const handler = nc().use(auth);


handler.put(async (req,res)=>{
    try{
        connectDb();
        const {id}=req.body;
        const user = await User.findById(req.user);
        let user_addreses=user.address;
        let addresses=[];
        for(let i=0; i<user_addreses.length; i++ ){
            let temp_address={};
            if(user_addreses[i]._id==id){
                temp_address={...user_addreses[i].toObject(),active:true};
                addresses.push(temp_address);
            }else{
                temp_address={...user_addreses[i].toObject(),active:false};
                addresses.push(temp_address);

            }
        }

     await user.updateOne({
            address:addresses,
        },
    
    {new:true});
    
       

        disconnectDb();
        return res.json({addresses});
       
    } catch(error){
        return res.status(500).json({message:error.message});
    }

});

handler.delete(async(req,res)=>{
    try {

        connectDb();
        const {id}=req.body;
        const user=await User.findById(req.user);

        await user.updateOne({
            $pull:{address:{_id:id}},
        },
        {new:true}
    );
        disconnectDb();
        res.json({addresses:user.address.filter((a)=>a._id!= id)});
        
    } catch (error) {

        return res.status(500).json({message:error.message});
        
    }
})

export default handler;


