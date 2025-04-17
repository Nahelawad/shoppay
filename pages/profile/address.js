import Layout from "../../components/profile/layout";
import { getSession } from "next-auth/react";
import User from "../../models/User";
import Shipping from "../../components/checkout/shipping";
import { useState } from "react";

export default function Addresses({user,tab}){
    const [addresses,setAddresses]=useState(user.address.address);
    return (
        <Layout session={user.user} tab={tab}>
            WELCOME TO YOUR ADDRESS PAGE

            <Shipping user={user} addresses={addresses} setAddresses={setAddresses} profile/>
        </Layout>
    )
}

export async function getServerSideProps(ctx){
    const {query,req}=ctx;
    const session= await getSession({req});
    const tab=query.tab || 0;

    const address=await User.findById(session.user.id).select("address").lean();
    console.log("address",address)
    return{
        props:{
            user:{
            user: session.user,
           address:JSON.parse(JSON.stringify(address)),
            },
            tab,
        },
    };
}