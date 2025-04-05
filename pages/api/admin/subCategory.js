import nc from "next-connect";
import auth from "../../../middleware/auth";
const handler=nc().use(auth);
import { connectDb,disconnectDb } from "../../../utils/db";
import Category from "../../../models/Category";
import  SubCategory from "../../../models/SubCategory";
import slugify from "slugify";
import { error } from "console";

handler.post(async(req,res)=>{
    try {
        const {name,parent}=req.body;
        connectDb
        const test=await SubCategory.findOne({name});
        if(test){
            return  res.status(400).json({message:"SubCategory already exist,Try a different name"});  
        }

        await new SubCategory ({name,parent, slug:slugify(name)}).save();
        disconnectDb();
        res.json({
            message: `SubCategory ${name} has been created successfully.`,
            subCategories:await SubCategory.find({}).sort({updatedAt:-1}),
        })
        
    } catch (error) {
        disconnectDb();
        res.statusCode(500).json({message:error.message})
        
    }
})

handler.delete(async(req,res)=>{
    try {
        const {id}=req.body;
        connectDb();
        await SubCategory.findByIdAndDelete(id);
        disconnectDb();
        return res.json({
            message:"SubCategory has beesn deleted successfully",
            subCategories:await SubCategory.find({}).sort({updatedAt:-1})
        })

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
});

handler.put(async(req,res)=>{
    try {
        const {id,name,parent}=req.body;
        connectDb();
        await SubCategory.findByIdAndUpdate(id,{name,parent,slug:slugify(name)});
        disconnectDb();
        return res.json({
            message:"SubCategory has been updated successfully",
            subCategories:await SubCategory.find({}).sort({createdAt:-1})
        })

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
});



handler.get(async(req,res)=>{
 try {
    const { category }=req.query;
    if(!category){
        return res.json([]);
    }
    connectDb();
    const results=await SubCategory.find({parent:category}).select("name");
    disconnectDb();
    return res.json(results);
    
 } catch (error) {
    res.status(500).json({message:error.message})
    
 } 
})

export default handler