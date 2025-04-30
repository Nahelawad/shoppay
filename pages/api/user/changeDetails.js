import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";

const handler = nc().use(auth);


handler.put(async (req,res)=>{
    try{
        await connectDb();
        const { current_name,
            current_email,
            current_password,
            name,
            email,
            password,}=req.body;
        const user= await User.findById(req.user);
        const crypted_password=await bcrypt.hash(password,12)

        if(!user.password){
            await user.updateOne({
                password:crypted_password,
            });
            return res.status(200).json({message:"We noticed your use of a social media platform to log in so we added a password to login"})
        }
        const isMatch= await bcrypt.compare(current_password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Current Password is Wrong"});
        }
        await user.updateOne({
            name,
            email,
            password:crypted_password,
        });

        res.json({message:"Your details has been changed successfully "})

       await disconnectDb();
    } catch(error){
        return res.status(500).json({message:error.message});
    }

});

export default handler;


