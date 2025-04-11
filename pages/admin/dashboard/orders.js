import CollapsibleTable from "../../../components/admin/orders/table";
import Layout from "../../../components/admin/layout";
import { connectDb,disconnectDb } from "../../../utils/db";
import User from "../../../models/User";
import Order from "../../../models/Order";


export default function orders({orders}){
    console.log("ORDERS",orders);
    return(
        <Layout>
        <CollapsibleTable rows={orders}/>
        </Layout>

    )
}

export async function getServerSideProps(ctx) {

    await connectDb();

    const orders=await Order.find({}).populate({path:"user",model:User,select:"name email image"}).sort({createdAt:-1}).lean();

     
    return {
        props:{
            orders:JSON.parse(JSON.stringify(orders)),
        }
    }

    
}