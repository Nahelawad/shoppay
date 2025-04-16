import Layout from "../../components/profile/layout";
import { getSession } from "next-auth/react";


export default function index({user,tab}){
    console.log("USER",user)
    return (
        <Layout session={user.user} tab={tab}>
            WELCOME TO YOUR PROFILE <h1 style={{fontWeight:"bold"}}>{user.user.name}</h1>
            
        </Layout>
    )
}

export async function getServerSideProps(ctx){
    const {query,req}=ctx;
    const session= await getSession({req});
    const tab=query.tab || 0;
    return{
        props:{
           user: session,
            tab,
        },
    };
}