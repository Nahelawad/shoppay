import nc from "next-connect";
import { connectDb,disconnectDb } from "../../../../utils/db";
import Product from "../../../../models/Product";
import slugify from "slugify";
import auth from "../../../../middleware/auth";
import admin from "../../../../middleware/admin";

const handler=nc().use(auth).use(admin);


handler.post( async (req,res)=>{
    try {
        connectDb();
        if(req.body.parent){
            const parent=await Product.findById(req.body.parent);
            if(!parent){
                return res.status(400).json({
                    message:"Parent Product is not found",
                });
            }else{
                const newParent=await parent.updateOne({
                    $push:{
                        subProducts:{
                            sku:req.body.sku,
                            color:req.body.color,
                            images:req.body.images,
                            sizes:req.body.sizes,
                            discount:req.body.discount,
                        },
                    },
                },{new:true});
            }
        }else{
            req.body.slug=slugify(req.body.name);
            const newProduct=new Product({
                name:req.body.name,
                description:req.body.description,
                brand:req.body.brand,
                details:req.body.details,
                questions:req.body.questions,
                slug:req.body.slug,
                category:req.body.category,
                subCategories:req.body.subCategories,
                subProducts:[{
                            sku:req.body.sku,
                            color:req.body.color,
                            images:req.body.images,
                            sizes:req.body.sizes,
                            discount:req.body.discount,

                },],
            });
            await newProduct.save();
            res.status(200).json({message:"Product created Successfully"});
        }
        disconnectDb();
        
    } catch (error) {

        res.statusCode(500).json({message:error.message});
        
    }

});

handler.delete(async (req,res)=>{
    try {
        connectDb();
        const {id}=req.body;

        const product=await Product.findById(id);
        if(!product){
            return res.status(400).json({message:"Product Not found."});
        }

        await Product.findByIdAndDelete(id);
        disconnectDb();
        return res.status(200).json({message:"Product deleted successfully."})
        
    } catch (error) {
        console.error("Delete Error:",error);
        return res.status(500).json({message:error.message});
        
    }
})


export default handler;