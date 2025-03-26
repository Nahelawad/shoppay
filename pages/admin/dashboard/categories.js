import Category from "../../../models/Category";
import Layout from "../../../components/admin/layout";
import { connectDb,disconnectDb } from "../../../utils/db";
import { useState } from "react";
import Create from "../../../components/admin/categories/Create";
import List from "../../../components/admin/categories/list";

export default function Categories({categories}){
    const [data,setData]=useState(categories);
    console.log("categories",categories);
    console.log("data",data);
    return(
           <Layout>
            <div>
                <Create setCategories={setData}/>
                <List categories={data} setCategories={setData}/>
             
            </div>
           </Layout>
        
    );
}

export async function getServerSideProps(context) {
 connectDb()

 const categories=await Category.find({}).sort({updatedAt:-1}).lean();

 return {
    props:{
        categories:JSON.parse(JSON.stringify(categories)),
    },
 }; 
}
