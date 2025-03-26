import nc from "next-connect";
import auth from "../../../middleware/auth";
const handler=nc().use(auth);
import { connectDb,disconnectDb } from "../../../utils/db";
import Category from "../../../models/Category";
import slugify from "slugify";

handler.post(async(req,res)=>{
    try {
        const {name}=req.body;
        connectDb
        const test=await Category.findOne({name});
        if(test){
            return  res.status(400).json({message:"Category already exist,Try a different name"});  
        }

        await new Category ({name, slug:slugify(name)}).save();
        disconnectDb();
        res.json({
            message: `Category ${name} has been created successfully.`,
            categories:await Category.find({}).sort({updatedAt:-1}),
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
        await Category.findByIdAndDelete(id);
        disconnectDb();
        return res.json({
            message:"Category has beesn deleted successfully",
            categories:await Category.find({}).sort({updatedAt:-1})
        })

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})



export default handler