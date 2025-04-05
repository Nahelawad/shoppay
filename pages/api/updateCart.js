import nc from "next-connect";
import { connectDb,disconnectDb } from "../../utils/db";
import Product from "../../models/Product";

const handler = nc();


handler.post(async (req,res)=>{
    try{
        connectDb();
        
        disconnectDb();

        return res.json({
            
        })

    } catch(error){
        return res.status(500).json({message:error.message});
    }

});

export default handler;


