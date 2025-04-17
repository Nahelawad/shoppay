import Layout from "../../components/profile/layout";
import { getSession } from "next-auth/react";
import User from "../../models/User"


export default function Addresses({user,tab}){
    return (
        <Layout session={user.user} tab={tab}>
            WELCOME TO YOUR WISHLIST PAGE
        </Layout>
    )
}



export async function getServerSideProps(ctx){
    const {query,req}=ctx;
    const session= await getSession({req});
    const tab=query.tab || 0;

    const wishlistData=await User.findById(session.user.id).select("wishlist").populate("wishlist.product").lean();
    return{
        props:{
           user: session,
           wishlist:JSON.parse(JSON.stringify(wishlistData.wishlist)),
            tab,
        },
    };
}