import mongoose from "mongoose";

const {ObjectId}=mongoose.Schema;

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[2,"Must be atleast 2 characters"],
        maxlength:[32,"Must be atleast 2 characters"],
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },

},{
    timestamps:true,
});

const Category= mongoose.models.Category || mongoose.model("Category",categorySchema);
export default Category;