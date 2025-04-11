import EnhancedTable from "../../../components/admin/users/table";
import Layout from "../../../components/admin/layout";
import { connectDb,disconnectDb } from "../../../utils/db";
import User from "../../../models/User";

export default function users({users}){
    console.log(users);
    return(
        <Layout>
           <div>

            <EnhancedTable rows={users}/>

           </div>

        </Layout>
    )
}


export async function getServerSideProps(ctx){
    await connectDb();
    const users=await User.find({}).sort({createdAt:-1}).lean();

    return{
        props:{
            users:JSON.parse(JSON.stringify(users)),
        },
    };
}