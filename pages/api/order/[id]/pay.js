import nc from 'next-connect';
import { connectDb,disconnectDb } from "../../../../utils/db";
import auth from "../../../../middleware/auth";    
import Order from "../../../../models/Order";

const handler =nc().use(auth);

handler.put(async(req,res)=>{
    await connectDb();
    const order=await Order.findById(req.body.order_id);
    if (!order) {
        console.log("Order not found");
        return res.status(404).json({ message: "Order not found" });
    }
    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.status="Completed";
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            email_address:req.body.email_address,
        };
        const newOrder=await order.save();
        console.log(newOrder);
        await disconnectDb();
        res.status(200).json({message:"Order is paid",order:newOrder});
    }else{
        await disconnectDb();
        res.status(404).json({message:"Order not found"});
    }
});

export default handler;