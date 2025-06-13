import nc from "next-connect";
import {connectDb, disconnectDb} from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";



const handler = nc();

handler.put( async (req, res) => {
  try {
 
    await connectDb();
    const {user_id,password}=req.body;
    const user=await User.findById(user_id);
    if(!user){
        return res.status(400).json({message:"This Account doesnt exist."});
    }

    const cryptedPassword=await bcrypt.hash(password,12);

    await user.updateOne({
        password:cryptedPassword,
    });
    
    res.json({email:user.email})

    await disconnectDb();
   
    
   
      
    
    
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }
});

export default handler;
