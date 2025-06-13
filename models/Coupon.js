import mongoose from "mongoose";

const {ObjectId}=mongoose.Schema;



// Check if the "Coupon" model already exists in Mongoose models
// If it exists (e.g., during hot reload in development), reuse it
// Otherwise, create a new model named "Coupon" using the couponSchema
const couponSchema=new mongoose.Schema({
    coupon:{
        type:String,
        trim:true,
        unique:true,
        uppercase:true,
        required:true,
        minLength:4,
        maxLength:10,
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
        required:true,
    },

    discount:{
        type:Number,
        required:true,
    },
    
},{
    timestamps:true,
});

const Coupon= mongoose.models.Coupon || mongoose.model("Coupon",couponSchema);

// Export the Coupon model so it can be imported and used in other files
export default Coupon;