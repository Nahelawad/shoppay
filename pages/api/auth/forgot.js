import nc from "next-connect";
import { validateEmail } from "../../../utils/validation";
import {connectDb, disconnectDb} from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { create } from "domain";
import { createActivationToken,createResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate";


const handler = nc();

handler.post( async (req, res) => {
  try {
 
    await connectDb();
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
           return res.status(400).json({message:"This email does not exist."});
    }

    const user_id=createResetToken({
      id:user._id.toString(),
    });
    
   

    const url=`${process.env.BASE_URL}/auth/reset/${user_id}`;

    sendEmail(email,url,"","Reset Your Password",resetEmailTemplate);
    await disconnectDb();
    res.json({message: "Email has been sent to you reset the password using it.",

    });
    
   
      
    
    
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }
});

export default handler;
