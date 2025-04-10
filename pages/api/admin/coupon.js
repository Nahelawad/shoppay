import nc from "next-connect";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";
import { connectDb,disconnectDb } from "../../../utils/db";
import Coupon from "../../../models/Coupon";
import slugify from "slugify";
const handler=nc().use(auth).use(admin);


handler.post(async(req,res)=>{
    try {
        const {coupon,discount,startDate,endDate}=req.body;
        connectDb
        const test=await Coupon.findOne({coupon});
        if(test){
            return  res.status(400).json({message:"Coupon already exist,Try a different name"});  
        }

        await new Coupon ({coupon,discount,startDate,endDate}).save();
        disconnectDb();
        res.json({
            message: `Coupon ${coupon} has been created successfully.`,
            coupons:await Coupon.find({}).sort({updatedAt:-1}),
        })
        
    } catch (error) {
        disconnectDb();
        res.status(500).json({message:error.message})
        
    }
})

handler.delete(async(req,res)=>{
    try {
        const {id}=req.body;
        connectDb();
        await Coupon.findByIdAndDelete(id);
        disconnectDb();
        return res.json({
            message:"Coupon has been deleted successfully",
            coupons:await Coupon.find({}).sort({updatedAt:-1})
        })

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
});

handler.put(async(req,res)=>{
    try {
        const {id,coupon,discount,startDate,endDate}=req.body;
        connectDb();
        await Coupon.findByIdAndUpdate(id,{coupon,discount,startDate,endDate});
        disconnectDb();
        return res.json({
            message:"Coupon has been updated successfully",
            coupons:await Coupon.find({}).sort({createdAt:-1})
        })

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
});



export default handler